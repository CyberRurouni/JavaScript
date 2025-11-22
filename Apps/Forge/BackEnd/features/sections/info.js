// relevantInfo.js
import supabase from "../data/db.js"

async function fetchData() {
    // Fetch from assistant
    const { data: assistant, error: assistantError } = await supabase
        .from("assistant")
        .select("persona, philosophy")

    if (assistantError) console.error("Assistant fetch failed:", assistantError)

    // Fetch from user
    const { data: user, error: userError } = await supabase
        .from("user")
        .select("personality")

    if (userError) console.error("User fetch failed:", userError)

    // Fetch from tasks
    const { data: tasks, error: tasksError } = await supabase
        .from("tasks")
        .select("task_1, task_2, task_3")

    if (tasksError) console.error("Tasks fetch failed:", tasksError)

    // Bundle the result together
    return {
        assistant,
        user,
        tasks
    }
}

async function relevantInfo(taskKey) {
    const { assistant, user, tasks } = await fetchData()
    // Base info (always included)
    const base = {
        persona: assistant[0]?.persona,
        personality: user[0]?.personality
    }

    let info = {}

    switch (taskKey = "task1") {
        case "task1":
            info = { ...base, task: tasks[0]?.task_1 }
            break

        case "task2":
            info = { ...base, task: tasks[0]?.task_2.task }
            break

        case "task2a":
            info = { ...base, task: tasks[0]?.task_2.conditions[0] }
            break

        case "task2b":
            info = { ...base, task: tasks[0]?.task_2.conditions[1], philosophy: assistant[0]?.philosophy }
            break

        case "task3":
            info = { ...base, task: tasks[0]?.task_3.task, philosophy: assistant[0]?.philosophy }
            break

        case "task3a":
            info = { ...base, task: tasks[0]?.task_3.conditions[0], philosophy: assistant[0]?.philosophy }
            break

        case "task3b":
            info = { ...base, task: tasks[0]?.task_3.conditions[1], philosophy: assistant[0]?.philosophy }
            break

        case "task3c":
            info = { ...base, task: tasks[0]?.task_3.conditions[2], philosophy: assistant[0]?.philosophy }
            break

        default:
           console.log("err")
    }
    return info
}

export { relevantInfo }
