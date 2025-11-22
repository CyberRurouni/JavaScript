import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import CreateSession from "./CreateSession";
import styles from "../styles/components/SessionZone.module.css";

export default function SessionZone() {
  const [sessions, setSessions] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [connectors, setConnectors] = useState([]);
  const [activeDrag, setActiveDrag] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch sessions from backend
  useEffect(() => {
    console.log("Fetching sessions from backend...");
    fetch('http://localhost:5000/fetchSessions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          const formattedSessions = data.map((material, index) => ({
            id: material.id,
            position: { x: 200 + index * 180, y: 200 },
            data: { ...material.session },
          }));
          setSessions(formattedSessions);
        }
        else
          setSessions([]);
      })
      .catch((err) => {
        console.error("Error fetching sessions:", err);
      });
    setDataUpdated(false);
  }, [dataUpdated]);

  // Connector logic
  useLayoutEffect(() => {
    const container = document.querySelector(`.${styles.sessionZone}`);
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newConnectors = [];

    sessions.forEach((session, i) => {
      if (i === 0) return;
      const prev = sessions[i - 1];

      const prevEl = document.getElementById(`session-${prev.id}`);
      const currEl = document.getElementById(`session-${session.id}`);
      if (!prevEl || !currEl) return;

      const prevRect = prevEl.getBoundingClientRect();
      const currRect = currEl.getBoundingClientRect();

      const prevX = prevRect.right - containerRect.left;
      const prevY = prevRect.top + prevRect.height / 2 - containerRect.top;
      const currX = currRect.left - containerRect.left;
      const currY = currRect.top + currRect.height / 2 - containerRect.top;

      newConnectors.push({
        id: `line-${prev.id}-${session.id}`,
        path: `M${prevX},${prevY} C${prevX + 50},${prevY} ${currX - 50},${currY} ${currX},${currY}`,
      });
    });

    setConnectors(newConnectors);
  }, [sessions]);

  // Dragging logic
  useEffect(() => {
    function handleMouseMove(e) {
      if (!activeDrag) return;

      setSessions((existing) =>
        existing.map((s) => {
          if (s.id !== activeDrag.id) return s;

          let newX = e.clientX - activeDrag.containerLeft - activeDrag.offsetX;
          let newY = e.clientY - activeDrag.containerTop - activeDrag.offsetY;

          newX = Math.max(0, newX);
          newX = Math.min(newX, activeDrag.containerRight - activeDrag.containerLeft - activeDrag.width);
          newY = Math.max(0, newY);
          newY = Math.min(newY, activeDrag.containerBottom - activeDrag.containerTop - activeDrag.height);

          return { ...s, position: { x: newX, y: newY } };
        })
      );
    }

    function handleMouseUp() {
      setActiveDrag(null);
    }

    if (activeDrag) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeDrag]);

  const startDrag = (event, session) => {
    const sessionEl = event.currentTarget;
    const sessionRect = sessionEl.getBoundingClientRect();
    const containerRect = sessionEl.parentElement.getBoundingClientRect();

    setActiveDrag({
      id: session.id,
      offsetX: event.clientX - sessionRect.left,
      offsetY: event.clientY - sessionRect.top,
      containerLeft: containerRect.left,
      containerTop: containerRect.top,
      containerRight: containerRect.right,
      containerBottom: containerRect.bottom,
      width: sessionRect.width,
      height: sessionRect.height,
    });
  };

  return (
    <div className={styles.sessionZone}>
      {/* SVG Connectors */}
      <svg className={styles.svgLines}>
        {connectors.map((line) => (
          <path
            key={line.id}
            d={line.path}
            stroke="#888"
            strokeWidth="2"
            fill="none"
          />
        ))}
      </svg>

      {/* Session Nodes */}
      <div className={styles.sessions}>
        {sessions.map((session) => (
          <div
            id={`session-${session.id}`}
            key={session.id}
            className={styles.sessionNode}
            style={{
              left: session.position.x,
              top: session.position.y,
            }}
            onMouseDown={(e) => startDrag(e, session)}
          >
            {sessions[0].id === session.id ?
              ""
              : < div className={`${styles.handle} ${styles.leftHandle}`} />
            }
            {sessions[sessions.length - 1].id !== session.id ?
              <div className={`${styles.handle} ${styles.rightHandle}`} />
              : ''
            }

            <div className={styles.sessionContent}>
              <h3 className={styles.sessionTitle}>{session.data.title}</h3>
              <p className={styles.sessionTime}>
                {session.data.start && session.data.end
                  ? `${session.data.start} – ${session.data.end}`
                  : "Time not set"}
              </p>
              {session.data.aims && (
                <div className={styles.sessionAims}>
                  {session.data.aims.map((aimObj, idx) => (
                    <div key={`${session.id}-${idx}`}>{aimObj.aim}</div>
                  ))}
                </div>
              )}
              <div className={styles.tracker}>
                <Link to={`/session/${session.id}`}>Tracker</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button className={styles.addBtn} onClick={() => setShowCreateForm(true)}>
        +
      </button>

      {/* Modal */}
      {showCreateForm && (
        <CreateSession
          onClose={() => setShowCreateForm(false)}
          onSave={() => {
            setDataUpdated(true);
            setShowCreateForm(false);
          }}
        />
      )}
    </div>
  );
}