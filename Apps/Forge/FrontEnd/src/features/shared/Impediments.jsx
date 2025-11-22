// src/shared/Impediments.jsx
import styles from "./styles/Impediments.module.css";

export default function Impediments() {
  return (
    <div className={styles.impediments}>
      <p className={styles.item}>Recurring</p>
      <p className={styles.item}>Problematic</p>
      <p className={styles.item}>New</p>
    </div>
  );
}

