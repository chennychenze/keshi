import styles from "../styles/section.module.scss";

const Section = ({ children }) => {
  return <div className={styles.section}>{children}</div>;
};

export default Section;
