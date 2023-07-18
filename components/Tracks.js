import React from "react";
import Link from "next/link";
import styles from "../styles/tracks.module.scss";

// Tracks in each album page
const Tracks = ({ tracks }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.tracksList}>
        {tracks.map((track, index) => {
          return (
            <li key={index} className={styles.track}>
              <Link href={`/tracks/${encodeURIComponent(track)}`}>{track}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tracks;
