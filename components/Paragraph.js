import classNames from "classnames/bind";
import styles from "../styles/paragraph.module.scss";

let cx = classNames.bind(styles);

const Paragraph = ({ children, marginBottom }) => {
  let paragraphClasses = cx({
    paragraph: true,
    [`margin-bottom-${marginBottom}`]: marginBottom,
  });
  return <p className={paragraphClasses}>{children}</p>;
};

export default Paragraph;
