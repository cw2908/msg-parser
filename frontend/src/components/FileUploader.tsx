import React, { useState } from "react";
import { FileDrop } from "react-file-drop";
import classnames from "classnames";
import styles from "styles/FileUploader.module.scss";
import JSONTree from "react-json-tree";
import CopyToClipboard from "react-copy-to-clipboard";

export interface IProps {
  file: File;
  setFile?: Function;
  setEmail?: Function;
}

type ErrorMessage = {
  errorMessage: string;
};

export const getStaticProps = async ({}) => {};

const FileUploader = ({ file, setFile, setEmail, email }) => {
  const [errorMessage, setErrorMessage] = useState("");
  console.log({ errorMessage });
  const [dragging, setDragging] = useState(false);
  const copyString = email ? `${email.headers}\n${email.body}` : null;
  const uploadFile = async ({ file, setEmail }): Promise<IProps> => {
    if (!file) {
      console.log("No File", file);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const requestOptions: any = {
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch("/msg", requestOptions);
      const data: any = await response.json();
      if (data.error_message) {
        setErrorMessage(data);
        setEmail({ headers: { headers: data } });
      }
      return data;
    } catch (err) {
      console.log({ err });
      if (err) {
        setErrorMessage(err);
        setEmail(null);
      }
    }
  };

  const handleSubmit = async (event) => {
    if (event.preventDefault) {
      event?.preventDefault();
    }
    const file = event?.target?.files[0];
    setFile(file);
    const newEmail = await uploadFile({ file, setEmail });
    setEmail(newEmail);
  };

  const handleFile = (event) => {
    setDragging(false);
    const file = event?.target?.files[0];
    if (!file) return null;
    setFile(file);
    handleSubmit({});
  };

  const handleChange = async (event) => {
    await setFile(event?.target?.files[0]);
    await handleSubmit(event);
  };

  return (
    <>
      <FileDrop
        onDragOver={() => {
          setDragging(true);
        }}
        onDragLeave={() => {
          setDragging(false);
        }}
        onDrop={(file) => handleSubmit(file)}>
        <div className={classnames(styles.card, styles["upload"])}>
          <div>
            {errorMessage ? (
              <div className={(styles["left-card"], styles.card)}>
                <JSONTree hideRoot={true} data={errorMessage} />
              </div>
            ) : null}
          </div>
          {email && copyString ? (
            <CopyToClipboard text={copyString}>
              <button
                className={classnames(
                  styles["left-card"],
                  styles.card,
                  styles.button
                )}
                onClick={() => {}}>
                Copy email to clipboard
              </button>
            </CopyToClipboard>
          ) : null}
          <label
            htmlFor="file-upload"
            title="Upload File"
            className={classnames(
              styles["file-label"],
              dragging ? styles.dragging : null
            )}>
            <input
              className={styles["file-input"]}
              id="file-upload"
              name="filename"
              type="file"
              accept="application/vnd.ms-outlook"
              onChange={(event) => handleSubmit(event)}
            />
            <h3>{file?.name || "Upload .msg File"}</h3>
          </label>
          <button
            className={
              (styles.card,
              file?.name
                ? styles.button
                : classnames(styles["button"], styles["button-hidden"]))
            }
            onClick={(event) => {
              event.preventDefault();
              setFile(null);
              setEmail(null);
              setErrorMessage("");
            }}>
            {"Clear"}
          </button>
        </div>
      </FileDrop>
    </>
  );
};

export default FileUploader;
