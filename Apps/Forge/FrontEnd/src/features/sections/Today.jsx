import Header from "../shared/Header";
import Impediments from "../shared/Impediments";
import SessionZone from "./components/SessionZone";

import styles from "./styles/Today.module.css";

export default function Today() {
    return (
        <div className={styles.layout}>
            <Header />

            <div className={styles.banner}>
                <Impediments />
            </div>

            {/* Session zone */}
            <SessionZone /> 
        </div>
    );
}

