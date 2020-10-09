import Head from "next/head";
import styles from "styles/Home.module.scss";
import classnames from "classnames";
import { FileDrop } from "react-file-drop";
import BaseText from "src/components/BaseText";
import { useState } from "react";
import FileUploader from "src/components/FileUploader";
import EmailInfo from "../src/components/EmailInfo";

export default function Home() {
  const [email, setEmail] = useState();
  const [file, setFile] = useState();
  return (
    <>
      <Head>
        <title>.msg File Parser. Upload and read .msg files easily!</title>
        <meta name="Description" content="Upload .msg files for free" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf8" />
        <meta
          name="keywords"
          content="email,msg,msg file,view msg file,outlook,view email headers,email headers,headers"
        />
        <meta name="robots" content="index,follow" />
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles["app-container"]}>
            <div className={styles.header}>
              <h2 className={(styles.title, styles.raised)}>
                .msg File Parser
              </h2>
            </div>
            <div className={styles["file-uploader"]}>
              <FileUploader
                file={file}
                setFile={setFile}
                setEmail={setEmail}
                email={email}
              />
            </div>
            <div className={classnames(styles.card, styles.email)}>
              <EmailInfo email={email} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
