import Link from "next/link";
import styles from "./../styles/index.module.css"; // Import CSS module

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          Welcome to the Real-Time Random Number Viewer!
        </h1>
        <div className={styles.centerContent}>
          <div className={styles.card}>
            <h1 className={styles.cardText}>
              This project highlights real-time data synchronization by
              broadcasting random numbers every 10 seconds from the backend to
              the frontend.
              <br />
              Beyond the basic requirements, I introduced key enhancements such
              as a countdown timer synchronized with the backend, a dynamic line
              chart for data visualization, and a historical data table with
              timestamps. <br />
              The application is securely deployed online with HTTPS and a
              custom domain, showcasing my ability to build, enhance, and deploy
              scalable full-stack solutions.
            </h1>
          </div>
        </div>

        {/* Add Image and Links */}
        <div className={styles.imageContainer}>
          <img
            src="/GitHub-logo.png"
            alt="GitHub Logo"
            className={styles.githubLogo}
          />
          <div className={styles.linkContainer}>
            <a
              href="https://github.com/MiladShahabi/real-time-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Frontend Code
            </a>
            <a
              href="https://github.com/MiladShahabi/real-time-backend"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Backend Code
            </a>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Link href="/data">
            <button className={styles.button}>Go to Data Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
