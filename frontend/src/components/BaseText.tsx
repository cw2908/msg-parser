import React from "react";
import classnames from "classnames";

interface IBaseText {
  text: string;
  styles?: string;
}

const BaseText = ({ text, styles }: IBaseText) => {
  return (
    <span className={classnames(styles ? styles : "")}>
      <p>{text}</p>
    </span>
  );
};

export default BaseText;
