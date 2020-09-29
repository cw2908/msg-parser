import React from "react";
import { FileDrop } from "react-file-drop";
import classnames from "classnames";
import styles from "styles/FileUploader.module.scss";
import { FileSubmitter } from "src/utils/FileSubmitter";
import BaseText from "src/components/BaseText";

const FileUploader = ({ file, setFile, setEmail }) => {
  const handleSubmit = async ({ event }) => {
    console.log(`Uploading ${file?.name}`);
    event?.preventDeafault();
    const formData = new FormData();
    formData.append("file", file);
    console.log({ formData, file });
    console.log({ formDataFile: formData["file"] });

    const res = await fetch("http://localhost:9292/msg", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    }).catch((err) => console.error({ err }));
    console.info({ res, formData });
    setEmail({
      // emailHeaders: Object.entries(res.headers),
      // emailBody: res.body,
    });
    return null;
  };

  const handleFile = ({ file }) => {
    if (!file[0]) return null;
    setFile(file[0]);
  };

  return (
    <>
      <FileDrop
        onDragOver={(event) => console.log("onDragOver", event)}
        onDragLeave={(event) => console.log("onDragLeave", event)}
        onDrop={(file) => handleFile({ file })}>
        <div
          className={classnames(
            styles.card,
            styles.raised,
            styles["file-box"]
          )}>
          <div>
            <div className="file-drop">
              <label title="Upload File">{file?.name || "Upload File"}</label>
              <input
                className={styles["file-input"]}
                id="file"
                name="filename"
                type="hidden"
                accept="application/vnd.ms-outlook"
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <FileSubmitter file={file} setFile={setFile} />
          </div>
          <div>
            <span className={styles.card} onClick={() => setFile(null)}>
              <BaseText text={file?.name ? "clear" : null} />
            </span>
          </div>
        </div>
      </FileDrop>
    </>
  );
};

export default FileUploader;
