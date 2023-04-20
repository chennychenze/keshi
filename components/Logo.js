import Image from "next/image";
import Link from "next/link";
import keshi from "../images/keshi.png";

const Logo = () => {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <Link href="/">
          <Image src={keshi} alt="keshi image" width={320} height={80} />
        </Link>
      </div>
    </div>
  );
};

export default Logo;
