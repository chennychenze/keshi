import React from "react";
import Grid from "./Grid";
import Link from "next/link";
import Card from "./Card";

// Albums in the homepage
const Albums = ({ albums }) => {
  return (
    <Grid>
      {albums.map((album) => {
        if (!album.image) {
          // Handle case where album image is not available
          return null;
        }
        return (
          <Link
            href={`/albums/${encodeURIComponent(album.name)}`}
            key={album.name}
          >
            <Card key={album.name} name={album.name} imageUrl={album.image} />
          </Link>
        );
      })}
    </Grid>
  );
};

export default Albums;
