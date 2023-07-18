import React from "react";
import Container from "@/components/Container";
import { getAlbumData } from "@/lib/api";
import Album from "@/components/SingleAlbum";
import Logo from "@/components/Logo";
import Tracks from "@/components/Tracks";

export async function getStaticPaths() {
  const albums = await getAlbumData();
  const paths = albums.map((album) => ({
    params: { album: album.name },
  }));
  console.log("Generated paths:", paths);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log("params:", params);
  const albums = await getAlbumData();
  const album = albums.find((album) => album.name === params.album);
  return {
    props: {
      album,
    },
  };
}

const SingleAlbumPage = ({ album }) => {
  const { name, image, tracks } = album;

  return (
    <>
      <Container>
        <Logo />
        <Album key={name} name={name} imageUrl={image} />
        <Tracks albumName={name} tracks={tracks} />
      </Container>
    </>
  );
};

export default SingleAlbumPage;
