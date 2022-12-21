"use strict";
const apiKey = '7a5463b0c977bb85432eb7a2615d6c94';
const apiURL = 'http://ws.audioscrobbler.com/2.0/';
const searchArtistsBlock = document.querySelector('.artists_response');
const searchAlbumsBlock = document.querySelector('.albums_response');
const searchTracksBlock = document.querySelector('.track_response');
const searchButton = document.getElementById('search');
const resetButton = document.getElementById('reset');
const searchResults = document.getElementById('results');
const inputField = document.querySelector('.input_field');
// TODO :: to utils.ts
const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
const appendArtistToDOM = (artist) => {
    const template = `
  <div class="artists_cell">
    <div class="cover">
      <img class="image" src="${artist?.image?.[3]['#text'] || 'assets/album_default.png'}" alt="">
    </div>
    <div class="text">
      <div class="name">
        <h3 class="halfheader">${artist?.name}</h3>
      </div>
      <div class="descriptions_cell">
        <p class="planetext">${artist?.stats.listeners} listeners</p>
      </div>
    </div>
  </div>
  `;
    searchArtistsBlock?.insertAdjacentHTML('beforeend', template);
};
const appendAlbumsToDOM = (album) => {
    const template = `
  <div class="albums_cell">
    <div class="cover">
      <img class="image" src="${album.image[3]['#text'] || 'assets/album_default.png'}" alt="">
    </div>
    <div class="text">
      <div class="name">
        <h3 class="halfheader">${album.name}</h3>
      </div>
      <div class="descriptions_cell">
        <p class="planetext">${album.artist}</p>
      </div>
    </div>
  </div>
  `;
    searchAlbumsBlock?.insertAdjacentHTML('beforeend', template);
};
const appendTracksToDOM = (track) => {
    if (!track)
        return;
    const template = `
  <div class="track_cell">
    <div class="track_info">
      <div class="track_play" onClick="(()=>{document.location.href = '${track.url}'})()">
        <img class="inner_img" src="assets/play_button.png" alt="">
      </div>
      <div class="track_cover">
        <img class="inner_img" src="${track.album?.image?.[3]['#text'] || 'assets/album_default.png'}" alt="">
      </div>
      <div class="track_name">
        <h3 class="halfheader">${track.name}</h3>
      </div>
      <div class="track_artist">${track.artist.name}</div>
    </div>
    <div class="track_time">${millisToMinutesAndSeconds(track.duration)}</div>
  </div>
  `;
    searchTracksBlock?.insertAdjacentHTML('beforeend', template);
};
const fetchSearchArtists = async (searchString) => {
    const response = await fetch(apiURL +
        `?method=artist.search&limit=8&artist=${searchString}&api_key=${apiKey}&format=json`);
    const data = await response.json();
    return data.results.artistmatches.artist;
};
const fetchTrackInfoByInfo = async (artist, track) => {
    const response = await fetch(apiURL +
        `?method=track.getInfo&api_key=${apiKey}&artist=${artist}&track=${track}&format=json`);
    const data = await response.json();
    return data.track;
};
const fetchArtistInfoByInfo = async (artist) => {
    const response = await fetch(apiURL +
        `?method=artist.getinfo&artist=${artist}&api_key=${apiKey}&format=json`);
    const data = await response.json();
    return data.artist;
};
const fetchSearchTracks = async (searchString) => {
    const response = await fetch(apiURL +
        `?method=track.search&limit=12&track=${searchString}&api_key=${apiKey}&format=json`);
    const data = await response.json();
    return data.results.trackmatches.track;
};
const fetchSearchAlbums = async (searchString) => {
    const response = await fetch(apiURL +
        `?method=album.search&limit=8&album=${searchString}&api_key=${apiKey}&format=json`);
    const data = await response.json();
    return data.results.albummatches.album;
};
const bootstrap = async (searchString) => {
    searchResults.innerText = `Search results for "${searchString}"`;
    if (!searchString.length)
        return;
    if (!inputField.value)
        inputField.value = searchString;
    const [searchTracks, searchAlbums, searchArtists] = await Promise.all([
        fetchSearchTracks(searchString),
        fetchSearchAlbums(searchString),
        fetchSearchArtists(searchString),
    ]);
    const tracksInfo = await Promise.all(searchTracks.map((track) => fetchTrackInfoByInfo(track.artist, track.name)));
    const artitsInfo = await Promise.all(searchArtists.map((artist) => fetchArtistInfoByInfo(artist.name)));
    tracksInfo.forEach((track) => appendTracksToDOM(track));
    searchAlbums.forEach((album) => appendAlbumsToDOM(album));
    artitsInfo.forEach((artist) => appendArtistToDOM(artist));
};
searchButton?.addEventListener('click', () => {
    window.localStorage.setItem('searchString', document.querySelector('.input_field')?.value);
    searchArtistsBlock.innerHTML = '';
    searchAlbumsBlock.innerHTML = '';
    searchTracksBlock.innerHTML = '';
    bootstrap(document.querySelector('.input_field')?.value);
});
resetButton?.addEventListener('click', () => {
    searchResults.innerText = `Search results for "${searchResults}"`;
    searchArtistsBlock.innerHTML = '';
    searchAlbumsBlock.innerHTML = '';
    searchTracksBlock.innerHTML = '';
    window.localStorage.setItem('searchString', '');
    inputField.value = '';
});
window.localStorage.setItem('searchString', 'Drake');
bootstrap(window.localStorage.getItem('searchString') || '');
