import Link from "next/link";
import styles from "./../styles/index.module.css"; // Import CSS module

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Welcome to the Real-Time Randomizer App</h1>
        <div className={styles.buttonContainer}>
          <Link href="/data">
            <button className={styles.button}>Go to Data Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
