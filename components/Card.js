import Image from "next/image";
import Heading from "./Heading";
import styles from "../styles/card.module.scss";

const Card = ({ name, imageUrl }) => {
  return (
    <div className={styles.card}>
      <Image
        src={imageUrl}
        alt={`${name} album cover`}
        width={150}
        height={150}
        className={styles.myImage}
      />
      <Heading level="4" marginBottom="1">
        {name}
      </Heading>
    </div>
  );
};

export default Card;
