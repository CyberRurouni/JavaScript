import supabase from "../../data/db.js"

async function getSessions() {
    const { data, error } = await supabase
        .from("sessions")
        .select("id, session")
        .order("id", { ascending: true });

    if (error) {
        console.error("Supabase error:", error);
        throw error;
    }
    return data;
}

async function trackSession(id) {
    const { data, error } = await supabase
        .from("sessions")
        .select("total_time")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Supabase error:", error);
        return null;
    }
    return data;
}

async function insertSession(sessionObj, duration) {
    // Insert into Supabase and let it assign an id
    const { data, error } = await supabase
        .from("sessions")
        .insert([{ session: sessionObj, total_time: duration }])
        .select()
        .single(); // Get the inserted row back

    if (error) {
        console.error("Supabase insert error:", error)
        return null
    }

    return data; // Return the inserted session with its new id
}

async function endSession(id, total_work_time, total_break_time, total_necessary_time) {
    const { data, error } = await supabase
        .from("sessions")
        .update({
            total_work_time,
            total_break_time,
            total_necessary_time
        })
        .eq("id", id)
        .select()
        .single()

    if (error) {
        console.error("Supabase error:", error)
        return null
    }

    return data
}

async function getSession(id) {
    const { data, error } = await supabase
        .from("sessions")
        .select("session, total_work_time, total_break_time, total_necessary_time, total_time") // all in one string
        .eq("id", id)
        .single()

    if (error) {
        console.error("Supabase error:", error)
        return null
    }

    return data
}

async function fillProblems(sessionId, problems) {
    const { data, error } = await supabase
        .from("sessions")
        .update({ problems })
        .eq("id", sessionId)
        .select("problems")
        .single()

    if (error) {
        console.error("Supabase error:", error)
        return null
    }
    return data
}


export { getSessions, trackSession, insertSession, endSession, getSession, fillProblems }