import React from "react";
import styles from "styles/EmailInfo.module.scss";
import JSONTree from "react-json-tree";
import classnames from "classnames";
import baseTheme from "src/themes/baseTheme";

type IEmailInfoObject = {
  body?: object;
  headers?: object;
};
interface IEmailInfo {
  email?: IEmailInfoObject;
}

const EmailInfo = ({ email }: IEmailInfo) => {
  console.log({ email });
  const headers = { ...email?.headers };
  console.log({ headers });
  const hasHeaders = Object.keys({ ...headers }).length > 0;
  console.log({ hasHeaders });
  return (
    <div className={styles["email-info"]}>
      <div className={classnames(styles.card, styles["header-title"])}>
        <h3 className={styles["column-title"]}>Email Headers</h3>
      </div>
      <div className={classnames(styles.card, styles["body-title"])}>
        <h3 className={styles["column-title"]}>Email Body</h3>
      </div>
      <div className={classnames(styles["email-header-panel"], styles.card)}>
        <div className={styles.pre}>
          {hasHeaders ? (
            <JSONTree
              hideRoot={true}
              data={hasHeaders ? headers : email}
              theme={baseTheme}
              invertTheme={true}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles["email-body-panel"]}>
        <p className={classnames(styles.pre, styles["small-text"])}>
          {`${email?.body ? JSON.stringify(email?.body) : ""}`
            .replace(/(?:\\[rn]|[\r\n]+)+/g, "\n")
            .replace(/(:\\t+)+/g, "\t")}
        </p>
      </div>
    </div>
  );
};

export default EmailInfo;
