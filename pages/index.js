import Head from "next/head";
import Image from "next/image";
import Albums from "@/components/Albums";
import Container from "@/components/Container";
import Bio from "@/components/Bio";
import Heading from "@/components/Heading";
import Hero from "@/components/Hero";
import Logo from "@/components/Logo";
import Section from "@/components/Section";
import { getKeshiBio, getAlbumData } from "@/lib/api";

export async function getStaticProps() {
  const bio = await getKeshiBio();
  const albums = await getAlbumData();

  return {
    props: { albums, bio },
  };
}

export default function Home({ albums, bio }) {
  return (
    <>
      <Head>
        <title>keshi</title>
        <meta name="description" content="keshi albums, tracks, and lyrics" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Logo />
        <Section>
          <Hero />
        </Section>
        <Section>
          <Heading level="2" marginBottom="1">
            who is keshi?
          </Heading>
          <Bio bio={bio} />
        </Section>
        <Section>
          <Heading level="3" marginBottom="1">
            Albums
          </Heading>
          <Albums albums={albums} />
        </Section>
      </Container>
    </>
  );
}
