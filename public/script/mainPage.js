"use strict";
//TODO :: PUT THIS IN .ENV
const apiKey = '7a5463b0c977bb85432eb7a2615d6c94';
const sharedSecret = '98159983df6ca4d1e13472b8d0ac82ae';
const apiURL = 'http://ws.audioscrobbler.com/2.0/';
const hotArtistsBlock = document.querySelector('.hot_section');
const popularTracksBlock = document.querySelector('.popular_section');
const appendArtistToDOM = (artist) => {
    const template = `
    <div class="artist_element" onClick="(()=>{document.location.href = '${artist.url}'})()">
      <div class="artist_cover">
        <img class="image" src="${artist.image}" alt="" srcset="">
      </div>
      <div class="artist_name">
        <h4 class="semiheader">${artist.name}</h4>
      </div>
      <div class="artist_genre">
        <p class="planetext">${artist.tags
        .map((tag) => tag.name)
        .join(' ')}</p>
      </div>
    </div>
  `;
    hotArtistsBlock?.insertAdjacentHTML('beforeend', template);
};
const appendTracksToDOM = (track) => {
    const template = `
    <div class="song_element" onClick="(()=>{document.location.href = '${track.url}'})()"> 
      <div class="song_cover">
        <img class="image" src="${track.image}" alt="">
      </div>
      <div class="song_description">
        <h4 class="semiheader">${track.name}</h4>
        <h5 class="halfheader">${track.artist.name}</h5>
        <p class="planetext">${track.tags
        .map((tag) => tag.name)
        .join(' ')}</p>
      </div>
    </div>
  `;
    popularTracksBlock?.insertAdjacentHTML('beforeend', template);
};
async function fetchHotArtists() {
    const response = await fetch(apiURL +
        `?method=chart.gettopartists&page=1&limit=12&api_key=${apiKey}&format=json`);
    const data = await response.json();
    return data.artists.artist;
}
async function fetchPopularTracks() {
    const response = await fetch(apiURL +
        `?method=chart.gettoptracks&page=1&limit=12&api_key=${apiKey}&format=json`);
    const data = await response.json();
    return data.tracks.track;
}
async function fetchTagsByArtistName(name) {
    const response = await fetch(apiURL +
        `?method=artist.gettoptags&artist=${name}&api_key=${apiKey}&format=json`);
    const data = await response.json();
    return data.toptags.tag.slice(0, 3);
}
async function fetchTagsByTrack(track, artist) {
    const response = await fetch(apiURL +
        `?method=track.gettoptags&artist=${artist}&track=${track}&api_key=${apiKey}&format=json`);
    const data = await response.json();
    return data.toptags.tag.slice(0, 3);
}
async function main() {
    const [hotArtists, popularTracks] = await Promise.all([
        await fetchHotArtists(),
        await fetchPopularTracks(),
    ]);
    const artistTags = await Promise.all(hotArtists.map(async (hotArtist) => await fetchTagsByArtistName(hotArtist.name)));
    const tracksTags = await Promise.all(popularTracks.map(async (popularTrack) => await fetchTagsByTrack(popularTrack.name, popularTrack.artist.name)));
    artistTags.forEach((tag, i) => {
        const hotArtist = hotArtists[i];
        const artist = {
            id: i,
            name: hotArtist.name,
            url: hotArtist.url,
            image: hotArtist.image[3]['#text'],
            tags: tag,
        };
        appendArtistToDOM(artist);
    });
    tracksTags.forEach((tag, i) => {
        const popularTrack = popularTracks[i];
        const track = {
            name: popularTrack.name,
            url: popularTrack.url,
            image: popularTrack.image[3]['#text'],
            tags: tag,
            artist: popularTrack.artist,
        };
        appendTracksToDOM(track);
    });
}
main();
