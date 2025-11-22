// src/shared/Header.jsx
import styles from "./styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <ul className={styles.navList}>
          <div className={styles.links}>
            <li className={styles.link}><a href="#">Today</a></li>
            <li className={styles.link}><a href="#">Week</a></li>
            <li className={styles.link}><a href="#">Month</a></li>
          </div>
          <li className={styles.accomplishments}>Badge:</li>
        </ul>
      </div>
    </header>
  );
}
