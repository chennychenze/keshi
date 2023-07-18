import React from "react";
import Container from "@/components/Container";
import { getAlbumData, getLyrics } from "@/lib/api";
import Album from "@/components/SingleAlbum";
import Logo from "@/components/Logo";

export async function getStaticPaths() {
  const albums = await getAlbumData();
  let paths = [];

  // Create paths for each track of each album
  albums.forEach((album) => {
    album.tracks.forEach((track) => {
      paths.push({
        params: {
          track: track,
        },
      });
    });
  });
  console.log("Generated paths:", paths);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log("Params:", params);
  const albums = await getAlbumData();
  let album;
  let track;

  // Find the album and track based on the track name
  albums.forEach((a) => {
    const t = a.tracks.find((t) => t === params.track);
    if (t) {
      album = a;
      track = t;
    }
  });

  const lyrics = await getLyrics(track);

  return {
    props: {
      albumName: album.name,
      albumImage: album.image,
      trackName: track,
      lyrics,
    },
  };
}

const SingleTrackPage = ({ albumName, albumImage, trackName, lyrics }) => {
  return (
    <Container>
      <Logo />
      <Album name={albumName} imageUrl={albumImage} />
      <h2
        style={{
          textAlign: "center",
          marginTop: "1.5em",
          marginBottom: "0.5em",
        }}
      >
        {trackName}
      </h2>
      <div
        style={{ textAlign: "center", marginBottom: "2em" }}
        dangerouslySetInnerHTML={{ __html: lyrics }}
      />
    </Container>
  );
};

export default SingleTrackPage;
