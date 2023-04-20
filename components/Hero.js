import Image from "next/image";
import styles from "../styles/hero.module.scss";
import keshi from "../images/keshi.webp";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <Image
        src={keshi}
        alt="keshi image"
        width={280}
        height={200}
        className={styles.hero}
      />
    </div>
  );
};

export default Hero;
