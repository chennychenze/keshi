const API_KEY = process.env.API_KEY;

export const getKeshiBio = async () => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=keshi&api_key=${API_KEY}&format=json`
  );
  const data = await response.json();
  const bio = data.artist.bio.content
    .replace(
      '<a href="https://www.last.fm/music/Keshi">Read more on Last.fm</a>. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.',
      ""
    )
    .replaceAll("Keshi", "keshi");
  return bio;
};

export const getAlbumData = async () => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Keshi&api_key=${API_KEY}&format=json`
  );

  const data = await response.json();
  const selectedAlbums = [
    "GABRIEL",
    "beside you",
    "THE REAPER",
    "always",
    "bandaids",
    "skeletons",
  ];
  const albums = data.topalbums.album
    .filter((album) => selectedAlbums.includes(album.name))
    .map((album) => ({
      name: album.name,
      image: album.image.find((img) => img.size === "extralarge")?.["#text"],
    }))
    .sort((a, b) => {
      const aIndex = selectedAlbums.indexOf(a.name);
      const bIndex = selectedAlbums.indexOf(b.name);
      return aIndex - bIndex;
    });

  return albums;
};
