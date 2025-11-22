import { useState, useEffect, useRef, use } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/components/Session.module.css";

export default function Session() {
    const { id } = useParams();

    const [totalTime, setTotalTime] = useState(null);
    const [activeMode, setActiveMode] = useState("work"); // "work", "break", "necessary"
    const [logs, setLogs] = useState([{ activeMode, "logs": [] }]); // "work", "break", "necessary"

    const intervalRef = useRef(null);
    const timeTrackRef = useRef([
        { "mode": "work", "tracker": { "hours": 0, "minutes": 0, "seconds": 0 } },
        { "mode": "break", "tracker": { "hours": 0, "minutes": 0, "seconds": 0 } },
        { "mode": "necessary", "tracker": { "hours": 0, "minutes": 0, "seconds": 0 } }
    ]);

    useEffect(() => {
        console.log("Session ID from URL:", id);
        // Here you can fetch session-specific data using the sessionId if needed
        fetch(`http://localhost:5000/trackSession?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched session data:", data);
                setTotalTime(data);
                // Handle the fetched session data as needed
            })
            .catch((err) => {
                console.error("Error fetching session data:", err);
            });
    }, [id]);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            let { seconds, minutes, hours } = timeTrackRef.current.find(t => t.mode === activeMode).tracker;

            seconds += 1;

            if (seconds >= 60) {
                seconds = 0;
                minutes += 1;
            }
            if (minutes >= 60) {
                minutes = 0;
                hours += 1;
            }

            timeTrackRef.current.tracker = { hours, minutes, seconds };
            console.log(`Time tracked: ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };

    }, [activeMode]);

    setTimeout(() => {
        console.log("Time tracked:", timeTrackRef.current);
        setActiveMode("break");
    }, 15000);

    return (
        <div className={styles.session}>
            <div className={styles.container}>
                <main>
                    <div className={styles.sessionDuration}>
                        <div className={styles.components}>
                            <div className={styles.work}></div>
                            <div className={styles.break}></div>
                            <div className={styles.necessary}></div>
                            <div className={styles.totalTime}></div>
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.startWork}>Work</button>
                            <button className={styles.startBreak}>Break</button>
                            <button className={styles.startNecessary}>Necessary</button>
                        </div>
                    </div>
                    <div className={styles.reflection}>
                        <div className={styles.assistantContainer}>
                            <div className={styles.assistant}>Your Asssistant here</div>
                        </div>
                        <div className={styles.reflect}>
                            <p>Reflect...</p>
                            <button className={styles.sendReflection}>Send</button>
                        </div>
                    </div>
                </main>
                <div className={styles.logs}>
                    <div className={styles.workLogs}>Work</div>
                    <div className={styles.breakLogs}>Break</div>
                    <div className={styles.necessaryLogs}>Necessary</div>
                </div>
            </div>
        </div>
    )
}
