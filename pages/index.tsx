import Head from "next/head";
import styles from "../components/layout.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={`${styles.title} ${styles.alignCenter}`}>
          Welcome to <a href="https://nextjs.org">Kenzo Blog</a>
        </h1>
      </main>

      <footer>
        <a
          className={styles.dispCenter}
          href="https://github.com/kenzoukenzou/nextJsBlog"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
