import Head from "next/head";
import styles from "../components/layout.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={`${styles.title} ${styles.alignCenter}`}>
          Welcome to <a href="https://nextjs.org">Kenzo Blog</a>
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          className={styles.dispCenter}
          href="https://github.com/kenzoukenzou/nextJsBlog"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>

      {/* TODO: module管理に移行する */}
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
