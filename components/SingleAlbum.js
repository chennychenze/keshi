import Image from "next/image";
import styles from "../styles/singlealbum.module.scss";

const Album = ({ name, imageUrl }) => {
  return (
    <div className={styles.album}>
      <Image
        src={imageUrl}
        alt={`${name} album cover`}
        width={250}
        height={250}
      />
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default Album;
