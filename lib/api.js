import axios from "axios";
// Last.fm API
const API_KEY = process.env.API_KEY;
// RAPID Genius API
const RAPID_KEY = process.env.RAPID_KEY;

export const getKeshiBio = async () => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=keshi&api_key=${API_KEY}&format=json`
  );
  const data = await response.json();
  const bio = data.artist.bio.content
    // Remove unnecessary bio content
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

  // These are the albums shown in the homepage
  const selectedAlbums = [
    "GABRIEL",
    "beside you",
    "THE REAPER",
    "always",
    "bandaids",
    "skeletons",
  ];
  const albums = data.topalbums.album
    // Extract selected albums from top albums
    .filter((album) => selectedAlbums.includes(album.name))
    // For each album in select albums, create properties
    .map((album) => ({
      name: album.name,
      image: album.image.find((img) => img.size === "extralarge")?.["#text"],
      tracks: [],
    }))
    .sort((a, b) => {
      // Sort albums based on the selectedAlbums order
      const aIndex = selectedAlbums.indexOf(a.name);
      const bIndex = selectedAlbums.indexOf(b.name);
      return aIndex - bIndex;
    });

  // Contruct the tracks property
  for (let i = 0; i < albums.length; i++) {
    const album = albums[i];
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=Keshi&album=${album.name}&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();

    let tracks = [];

    // Handle the album case "beside you" where there is only one track
    if (typeof data.album.tracks.track.length == "undefined") {
      tracks = [data.album.tracks.track.name];
    } else {
      tracks = data.album.tracks.track.map((track) => track.name);
    }

    album.tracks = tracks;
  }

  return albums;
};

// search song id, given keshi and trackname
export const getLyrics = async (trackName) => {
  const searchOptions = {
    method: "GET",
    url: "https://genius-song-lyrics1.p.rapidapi.com/search/",
    params: { q: `keshi ${trackName}` },
    headers: {
      "X-RapidAPI-Key": RAPID_KEY,
      "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(searchOptions);
    const firstHit = response.data.hits[0];
    if (!firstHit) {
      console.log("Lyrics not found for the track.");
      return null;
    }

    const songId = firstHit.result.id;

    // search lyrics, given unique song id
    const lyricsOptions = {
      method: "GET",
      url: `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/`,
      params: { id: songId },
      headers: {
        "X-RapidAPI-Key": RAPID_KEY,
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };

    const lyricsResponse = await axios.request(lyricsOptions);
    const lyricsHtml = lyricsResponse.data.lyrics.lyrics.body.html;
    return lyricsHtml;
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    return null;
  }
};
