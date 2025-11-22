import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { getSessions, trackSession, insertSession, endSession, getSession, fillProblems } from './features/sections/components/sessionZone.js';
import { injectInfo } from './features/assistant/ai.js'
import { relevantInfo } from './features/sections/info.js';



const app = express()
app.use(express.json())

// Allow requests from your frontend
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/fetchSessions", async (req, res) => {
  try {
    const sessions = await getSessions();
    res.json(sessions);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
})


app.post("/createSession", async (req, res) => {
  const { sessionObj, duration } = req.body
  const result = await insertSession(sessionObj, duration)

  res.json(result)
  res.end()
})

app.get("/trackSession", async (req, res) => {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: "Missing id parameter" })
  }

  const session_total_time = await trackSession(Number(id))
  if (!session_total_time) {
    return res.status(404).json({ error: "Session not found" })
  }

  res.json(session_total_time)
  res.end()
})

app.post("/sessionEnded", async (req, res) => {
  const { id, total_work_time, total_break_time, total_necessary_time } = req.body

  if (!id) {
    return res.status(400).json({ error: "Missing id parameter" })
  }

  const session = await endSession(Number(id), total_work_time, total_break_time, total_necessary_time)

  if (!session) {
    return res.status(404).json({ error: "Session not found" })
  }

  res.json(session)
  res.end()
})


let conversation = []
let lastOutcome

app.post('/sessionQuestioning', async (req, res) => {
  const { id, reflection } = req.body

  if (!id) return res.send("id missing")

  try {
    const session = await getSession(Number(id))
    const data = await relevantInfo(lastOutcome)

    let aiResponse = await injectInfo(data, session, reflection, conversation)

    if (typeof aiResponse === "string") {
      try {
        // Clean markdown fences if Gemini adds them
        if (aiResponse.startsWith("```")) {
          aiResponse = aiResponse.replace(/^```(?:json)?/, "").replace(/```$/, "").trim()
        }

        aiResponse = JSON.parse(aiResponse)
      } catch (err) {
        console.error("Failed to parse aiResponse:", aiResponse)
        throw err
      }
    }

    const problems = aiResponse?.problems || []
    const sessionProblems = await fillProblems(Number(id), problems)

    switch (aiResponse?.outcome) {
      case true:
        lastOutcome = "task2"
        break
      case false:
        lastOutcome = "task3"
        break
      case "worth":
        lastOutcome = "task2a"
        break
      case "not_worth":
        lastOutcome = "task2b"
        break
      case "all_late":
        lastOutcome = "task3a"
        break
      case "some_late":
        lastOutcome = "task3b"
        break
      case "failed":
        lastOutcome = "task3c"
        break
      default:
    }


    conversation.push({ "userReflection": reflection, "assistantResponse": aiResponse?.response })

    res.json({
      "response": aiResponse.response,
      "problems": sessionProblems?.problems || [],
    })

  } catch (err) {
    console.error("Error in /sessionQuestioning:", err)
    res.status(500).send("AI processing failed")
  }
})

// app.get('/sessionAnswers', async())



const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})





