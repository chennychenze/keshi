import React from "react";
import Container from "@/components/Container";
import { getAlbumData } from "@/lib/api";
import Album from "@/components/SingleAlbum";
import Card from "@/components/Card";
import Logo from "@/components/Logo";
import Tracks from "@/components/Tracks";

export async function getStaticPaths() {
  const albums = await getAlbumData();
  const paths = albums.map((album) => ({
    params: { album: album.name },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
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
        <Tracks tracks={tracks} />
      </Container>
    </>
  );
};

export default SingleAlbumPage;
