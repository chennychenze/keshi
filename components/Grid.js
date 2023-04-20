import styles from "../styles/grid.module.scss";

const Grid = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

export default Grid;
