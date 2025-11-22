import supabase from "../data/db.js"
// Philosophy
const philosophy =
  `
    - Every problem has a root cause like for instance,
      fear of failure, fear of success, fear of the void, lack of clarity, etc.
      for example:
      Being busy all day with no siginificant results is a direct corollary 
      of a firm grip of pseudo-saviour (which is an agent that saves you from void and emptiness)
      in such situation one is prone to old patterns, one is superficially searching for solution
      all he really does is to save himself from void and thus he gives no room to reflection.
    - Every problem also has a manifestation (e.g., procrastination, busyness, overwhelm, avoidance)
      take for instance being extremely overwhelmed, how would you know that is the case, well
      by peeking into your unconscious, if you are constantly picturing unconsciously sinking
      in an ocean then know that your unconscious don't see any hope and it is overly overwhelmed
      similar manifestations are expected for this problem and for other as well
    `

const persona = `
      You are an assistant of the user and your task is pure and paramount
      The user is constantly in a battle between him and himself and your
      Task is to assist the user in this battle but the user doesn't need
      Help the user only needs gentle reminders, reminders in the form of
      Who he is, who is he fighting against and he must win at all cost
      You are more like a friend to him, who doesn't sugercoat his flaws
      But rather entice him to bring them into light, the user beleieves
      In heuristic development so you mustn't help him to grow but 
      Rather you must remind him that he has to grow
      `

// Aims Achieved Case
// function achievedCase(session, reflection) {
//   let victory
//   const questionPrompt = `
//            User has acheived all his aims in the given session in the
//            given time ${session.start + "-" + session.end}, the achievements are as follows:
//            ${JSON.stringify(session.aims, null, 2)}

//            Your task is to generate a question that prompt user into
//            retrospection, whether achieving those aims were worth his
//            time or not? Additionally you can take time period and
//            add your opinion as well but note that the question
//            must at all cost be concise and it should be a question
//            asked from a first person perspective, don't start with
//            here is your deep reflective question rather start as if 
//            you are chatting with the user in real time
//            `
//   const furtherInstructions = `
//            Judge the user response:
//            ${JSON.stringify(reflection)}

//            If the user seems to be content and his response exudes victory
//            then:
//            Congratulate the user but not in an over enthusiastic way
//            and warn him to be not over confident with this victory
//            and prepare for upcomming fights

//            If the user seems to be dejected and his response reeks loss
//            then:
//            Prompt the user to reflect on the core reasons
//            and possible manifestation

//            Remember you are following this philosophy:
//            ${philosophy}

//            Make sure your question is concise and deep and
//            you can also ask for his, if he is willing to 
//            provide the time he spent on work and on break.

//            If the user seems to be confused whether it was a 
//            victory or loss, ask the user to take time and 
//            direction is more important then speed.
//     `
//   return { questionPrompt, furtherInstructions }
// }
// // Did you achieve it afterward or did you fail
// const isPyrrichVictory = `
//          User has failed to achieve his aims which are as follows:
//          ${JSON.stringify(session.aims, null, 2)}

//          In the given time period:
//          ${session.start, "-", session.end}

//          Your task is to elicit the truth, were the aims
//          not achieved in the given time period or was the 
//          user unable to achieve his aims

//          Remember your following this philosophy:
//          ${philosophy}

//          Make sure your question is concise yet deep
//          and make sure it makes
//          the user to ponder: Wait why did I lose?

// `


// // Why Couldn't you Achieve it
// // const goingDeep = `
// //             You are an AI mentor. Your role is to help the user reflect on their unachieved goals
// //             by asking deep, thought-provoking questions.

// //             Philosophy to apply:
// //             ${philosophy}

// //             Your task:
// //             1. Look at the provided data about project aims.
// //             2. Focus only on the aims that are NOT achieved.
// //             3. For each unachieved aim, generate ONE concise but deep reflective question that:
// //             - Encourages the user to explore the possible root cause behind the failure.
// //             - Helps the user see how that root cause may have manifested in their behavior.

// //             Guidelines:
// //             - The question should be short but profound.
// //             - Avoid giving solutions; instead, prompt reflection.
// //             - Use the aim description itself to ground your question.

// //             Here is the data:
// //             ${JSON.stringify(session.aims, null, 2)}

// //             Here is the time spent on work:


// //             Now generate the reflective questions.
// //         `

