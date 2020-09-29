import Head from "next/head";
import styles from "styles/Home.module.scss";
import classnames from "classnames";
import { FileDrop } from "react-file-drop";
import BaseText from "src/components/BaseText";
import { useState } from "react";
import FileUploader from "src/components/FileUploader";

export default function Home() {
  const [email, setEmail] = useState();
  const [file, setFile] = useState();
  console.log({ file });

  const handleFile = (file, event) => {
    console.log({ file, event });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>.msg File Parser. Upload and read .msg files easily!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2 className={(styles.title, styles.raised)}>.msg File Parser</h2>
        <FileUploader file={file} setFile={setFile} setEmail={setEmail} />
        <div className={styles.card}>
          <BaseText styles={styles.light} text={"View Results"} />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
