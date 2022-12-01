//TODO :: PUT THIS IN .ENV (INSECURE METHOD TO STORE KEYS)
export const apiKey = '7a5463b0c977bb85432eb7a2615d6c94';
export const apiURL = 'http://ws.audioscrobbler.com/2.0/';

const hotArtistsBlock = document.querySelector('.hot_section');
const popularTracksBlock = document.querySelector('.popular_section');

type TTag = {
  name: string;
  url: string;
};

type TBaseStruct = {
  name: string;
  url: string;
  image: TImage[];
  tags: TTag[];
}

type TImage = {
  "#text": string,
  size: string
}

type TArtist = {
  id: number;
} & TBaseStruct;

type TTrack = {
  artist: TArtist;
} & TBaseStruct;

const appendArtistToDOM = (artist: TArtist) => {
  const template = `
    <div class="artist_element" onClick="(()=>{document.location.href = '${artist.url}'})()">
      <div class="artist_cover">
        <img class="image" src="${artist.image[3]['#text']}" alt="" srcset="">
      </div>
      <div class="artist_name">
        <h4 class="semiheader">${artist.name}</h4>
      </div>
      <div class="artist_genre">
        <p class="planetext">
          ${artist.tags
      .map((tag: TTag) => tag.name)
      .join(' ')}
        </p>
      </div>
    </div>
  `;

  hotArtistsBlock?.insertAdjacentHTML('beforeend', template);
};

const appendTracksToDOM = (track: TTrack) => {
  const template = `
    <div class="song_element" onClick="(()=>{document.location.href = '${track.url}'})()"> 
      <div class="song_cover">
        <img class="image" src="${track.image[3]['#text']}" alt="">
      </div>
      <div class="song_description">
        <h4 class="semiheader">${track.name}</h4>
        <h5 class="halfheader">${track.artist.name}</h5>
        <p class="planetext">
          ${track.tags
      .map((tag: TTag) => tag.name)
      .join(' ')}
        </p>
      </div>
    </div>
  `;

  popularTracksBlock?.insertAdjacentHTML('beforeend', template);
};

const fetchHotArtists = async () => {
  const response = await fetch(
    apiURL +
    `?method=chart.gettopartists&page=1&limit=12&api_key=${apiKey}&format=json`
  );
  const data = await response.json();
  return data.artists.artist;
}

const fetchPopularTracks = async () => {
  const response = await fetch(
    apiURL +
    `?method=chart.gettoptracks&page=1&limit=12&api_key=${apiKey}&format=json`
  );
  const data = await response.json();
  return data.tracks.track;
}

const fetchTagsByArtistName = async (name: string) => {
  const response = await fetch(
    apiURL +
    `?method=artist.gettoptags&artist=${name}&api_key=${apiKey}&format=json`
  );
  const data = await response.json();
  return data.toptags.tag.slice(0, 3);
}

const fetchTagsByTrack = async (track: string, artist: string) => {
  const response = await fetch(
    apiURL +
    `?method=track.gettoptags&artist=${artist}&track=${track}&api_key=${apiKey}&format=json`
  );
  const data = await response.json();
  return data.toptags.tag.slice(0, 3);
}

const bootstrap = async () => {
  const [hotArtists, popularTracks]: [TArtist[], TTrack[]] = await Promise.all([
    fetchHotArtists(),
    fetchPopularTracks(),
  ]);
  const [artistTags, tracksTags]: [TTag[][], TTag[][]] = [
    await Promise.all(hotArtists.map(
      async (hotArtist: TArtist) => await fetchTagsByArtistName(hotArtist.name)
    )),
    await Promise.all(popularTracks.map(
      async (popularTrack: any) =>
        await fetchTagsByTrack(popularTrack.name, popularTrack.artist.name)
    ))
  ];

  hotArtists.forEach((artist, i) => appendArtistToDOM({ ...artist, tags: artistTags[i] }))
  popularTracks.forEach((track, i) => appendTracksToDOM({ ...track, tags: tracksTags[i] }))
}

bootstrap();