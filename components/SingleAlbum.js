import Image from "next/image";
import styles from "../styles/singlealbum.module.scss";

// Single album in each album page
const Album = ({ name, imageUrl }) => {
  return (
    <div className={styles.album}>
      <Image
        src={imageUrl}
        alt={`${name} album cover`}
        width={200}
        height={200}
      />
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default Album;
