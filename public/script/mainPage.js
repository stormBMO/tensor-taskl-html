"use strict";
//TODO :: PUT THIS IN .ENV
//@ts-ignore
const apiKey = '7a5463b0c977bb85432eb7a2615d6c94';
const sharedSecret = '98159983df6ca4d1e13472b8d0ac82ae';
const apiURL = 'http://ws.audioscrobbler.com/2.0/';
const hotArtistsBlock = document.querySelector('');
const popularTracksBlock = document.querySelector('');
const appendArtistToDOM = (artists) => {
    hotArtistsBlock === null || hotArtistsBlock === void 0 ? void 0 : hotArtistsBlock.insertAdjacentHTML('beforeend', ``);
};
const appendTracksToDOM = (track) => {
    popularTracksBlock === null || popularTracksBlock === void 0 ? void 0 : popularTracksBlock.insertAdjacentHTML('beforeend', ``);
};
