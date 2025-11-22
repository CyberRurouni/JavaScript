import { useState } from "react";
import styles from "../styles/components/CreateSession.module.css";

export default function CreateSession({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [aims, setAims] = useState([]);

  function getSessionDuration(start, end) {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    // Pick a reference date (today)
    const startDate = new Date();
    startDate.setHours(startH, startM, 0, 0);

    const endDate = new Date();
    endDate.setHours(endH, endM, 0, 0);

    // If end time is before start time, assume it goes past midnight
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const diffMs = endDate - startDate; // in ms
    const diffMins = Math.floor(diffMs / 1000 / 60);

    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;

    return { hours, minutes };
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const duration = getSessionDuration(start, end);
    console.log("Session Duration:", duration);
    fetch('http://localhost:5000/createSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "sessionObj": { title, start, end, aims }, duration }),
    }).catch(err => {
      console.error("Error creating session:", err);
    });
    onSave();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Create Session</h2>
        <form onSubmit={handleSubmit}>
          <label>
            title:
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>

          <label>
            Start Time:
            <input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
          </label>

          <label>
            End Time:
            <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
          </label>

          <label>
            Aims:
            <textarea
              value={aims.map(a => a.aim).join("\n")}
              onChange={(e) => {
                const splitAims = e.target.value.split("\n");
                setAims(splitAims.map(aim => ({ aim })));
              }}
            />
          </label>

          <div className={styles.actions}>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
