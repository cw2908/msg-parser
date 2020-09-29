import React from "react";
import classnames from "classnames";

interface IBaseText {
  text: string;
  styles?: object;
}

const BaseText = ({ text, styles }: IBaseText) => {
  return <span className={classnames(styles ? styles : "")}>{text}</span>;
};

export default BaseText;
