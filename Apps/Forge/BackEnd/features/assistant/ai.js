import { GoogleGenAI } from '@google/genai'

async function assistant(messages) {
    try {
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        })

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: messages.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.content }]
            })),
            generationConfig: {
                responseMimeType: "application/json"  // forces JSON
            }
        })

        let rawText = response.text.trim()

        // Clean markdown fences if Gemini adds them
        if (rawText.startsWith("```")) {
            rawText = rawText.replace(/^```(?:json)?/, "").replace(/```$/, "").trim()
        }

        return rawText
    } catch (err) {
        console.error("Error in Gemini generation:", err)
        throw err
    }
}

// Keeps memory alive across function calls
async function injectInfo(data, session, reflection = null, conversation = null) {
  const assistant_info = data.persona
  const philosophy = data.philosophy || null
  const user = data.personality
  const task = data.task || "Listen to user request"

  const prompt = `
You are given the following context:
- Persona: ${assistant_info}
- Philosophy: ${philosophy}
- User Info: ${user}
- Session Info: ${JSON.stringify(session)}
- Task: ${task}
- User Response: ${JSON.stringify(reflection) || "Initially empty"}
- Conversation So Far: ${JSON.stringify(conversation) || "Initially empty"} 

Your task:
1. Analyze the context carefully.
2. Ignore given task if the user already gave one in reflection.
3. Identify the outcome category:
   - Task 1 → Did the user achieve all aims? (true/false)
   - Task 2 → If all aims achieved, was it worth the time? ("worth" | "not_worth")
   - Task 3 → If not achieved, classify as ("all_late" | "some_late" | "failed").
4. Handle vagueness:
   - If response includes "failed", "sorry", "couldn’t" → classify as "failed".
   - If response includes "late", "delay", "could have done better" → classify as "some_late" | "all_late".
   - If no clues, stick with previous classification.
5. Once outcome is known, begin reflection using philosophy.
   - Ask probing, precise questions — no vague encouragements.
6. When user explicitly asks for help with problem identification:
   - Ground reflection in session data (work time, break time).
   - Probe: "Walk me through how your time was spent — step by step."
   - Probe: "At what exact point did resistance appear?"
   - Probe: "What concrete action were you attempting when you stopped?"
   - Probe: "What thoughts/images filled the gap where action should have been?"
7. Construct problems as **short categorical terms only** (no sentences).
   - Each rootCause + foam = a separate object.
   - Manifestations normally = array of strings.
   - If fantasizing appears, format it as:
     {
       "rootCause": "Overwhelm",
       "foam": "escapism",
       "manifestation": [
         { "Special": "fantasizing", "manifestations": ["anxiety","avoidance"] }
       ]
     }
8. If the user disagrees with your problem suggestion, keep only the fields he agrees with and leave the others as empty strings.
9. If the user tries to find problems himself but leaves some unknown, keep those fields empty.
10. Never invent problems — always stick to what was explicitly or implicitly revealed.

Return your answer strictly in JSON, using these schemas:

For Task 1 / Task 2 / Task 3:
{
  "response": "string",
  "outcome": (boolean or string depending on task)
}

For Task 2 (worthwhile):
{
  "response": "string",
  "allAimsAchieved": true,
  "success": true
}

For Task 2 (not worthwhile) and Task 3 ("all_late" | "some_late" | "failed"):
{
  "response": "string",
  "outcome": "string",
  "allAimsAchieved": false,
  "aims": [
    { "aim": "string", "achieved": true/false, "achievedLate": true/false }
  ],
  "problems": [
    {
      "rootCause": "fear of void",
      "foam": "existential dread",
      "manifestation": ["avoidance","busyness"]
    },
    {
      "rootCause": "Overwhelm",
      "foam": "escapism",
      "manifestation": [
        { "Special": "fantasizing", "manifestations": ["anxiety","self-doubt"] }
      ]
    }
  ]
}
`

  return await assistant([
    {
      role: "user",
      content: prompt
    }
  ])
}

export { injectInfo }
