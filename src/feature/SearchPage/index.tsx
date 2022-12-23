import { url } from 'inspector';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../../api/api-main';
import { TSearchAlbum, TSearchArtist, TSearchArtistInfo, TSearchTrack, TSearchTrackInfo } from '../../types/types';
import AlbumSearch from '../../components/AlbumSearch';
import ArtistSearch from '../../components/ArtistSearch';
import BasicImage from '../../components/BasicImage';
import BasicLink from '../../components/BasicLink';
import SearchMenu from '../../components/SearchMenu';
import TrackSearch from '../../components/TrackSearch';

const SearchPage = () => {
  const [searchString, setSearchString] = useState('')
  const [searchTracks, setSearchTracks] = useState<TSearchTrack[] | null>(null)
  const [searchAlbums, setSearchAlbums] = useState<TSearchAlbum[] | null>(null)
  const [searchArtists, setSearchArtists] = useState<TSearchArtist[] | null>(null)
  const [tracksInfo, setTracksInfo] = useState<TSearchTrackInfo[] | null>(null);
  const [artistsInfo, setArtistsInfo] = useState<TSearchArtistInfo[] | null>(null);


  const onSearchClicked = useCallback(() => {
    if (searchString) {
      (async () => {
        const [tempSearchTracks, tempSearchAlbums, tempSearchArtists]: [
          TSearchTrack[],
          TSearchAlbum[],
          TSearchArtist[]
        ] = await Promise.all([
          api.fetchSearchTracks(searchString),
          api.fetchSearchAlbums(searchString),
          api.fetchSearchArtists(searchString),
        ]);
        setSearchTracks(tempSearchTracks)
        setSearchAlbums(tempSearchAlbums)
        setSearchArtists(tempSearchArtists)
      })()
    }
  }, [searchString])

  useEffect(() => {
    if (searchTracks && searchArtists) {
      (async () => {
        console.log("searchTracks", searchTracks)
        console.log("searchArtists", searchArtists)
        const tempTracksInfo: TSearchTrackInfo[] = await Promise.all(
          searchTracks.map((track) => api.fetchTrackInfoByInfo(track.artist, track.name))
        );
        const tempArtistsInfo: TSearchArtistInfo[] = await Promise.all(
          searchArtists.map((artist) => api.fetchArtistInfoByInfo(artist.name))
        );
        setTracksInfo(tempTracksInfo);
        setArtistsInfo(tempArtistsInfo);
      })()
    }
  }, [searchTracks, searchArtists])

  useEffect(() => {
    console.log(artistsInfo, searchAlbums, tracksInfo)
  }, [artistsInfo, searchAlbums, tracksInfo])


  const onReset = useCallback(() => {
    setSearchString('');
    setArtistsInfo(null);
    setSearchAlbums(null);
    setTracksInfo(null);
    setSearchTracks(null);
    setSearchArtists(null);
  }, [])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)

  const isShow = useMemo(() => artistsInfo && searchAlbums && tracksInfo, [artistsInfo, searchAlbums, tracksInfo])

  return (
    <main>
      <div className="search_content">
        <div className="search_header">
          <div className="search_title">
            <h1 id="results">{isShow && `Search results for ${searchString}`}</h1>
          </div>
          <SearchMenu />
        </div>
        <hr className='split_search' />
        <div className="response_block">
          <div className="response_wrapper">
            <div className="search_input">
              <input className="input_field" type="text" placeholder="Search.." onChange={onInputChange} value={searchString} name="search" />
              <div className="search_controls">
                <button className="btn_search" onClick={onReset}>
                  X
                </button>
                <hr />
                <button className="btn_search" onClick={onSearchClicked}>
                  <BasicImage src='assets/search_gray.png' />
                </button>
              </div>
            </div>
            <div className="artists_block">
              <div className="artists_label">
                <h1>Artists</h1>
              </div>
              <div className="artists_response">
                {isShow && artistsInfo?.map((artist) => (
                  <ArtistSearch
                    key={artist.url}
                    stats={artist.stats}
                    image={artist.image}
                    name={artist.name}
                    url={artist.url}
                    streamable={artist.streamable} />
                ))}
              </div>
              <div className="more_artists">
                <a className="link_artists" href="#">More artists</a>
              </div>
            </div>
            <div className="albums_block">
              <div className="albums_label">
                <h1>Albums</h1>
              </div>
              <div className="albums_response">
                {isShow && searchAlbums?.map((album) => (
                  <AlbumSearch
                    key={album.url}
                    image={album.image}
                    artist={album.artist}
                    name={album.name}
                    url={album.url}
                    streamable={album.streamable} />
                ))}
              </div>
              <div className="more_albums">
                <a className="link_albums" href="#">More albums</a>
              </div>
            </div>
            <div className="tracks_block">
              <div className="tracks_label">
                <h1>Tracks</h1>
              </div>
              <div className="track_response">
                {isShow && tracksInfo?.map((track) => (
                  <TrackSearch
                    key={track.url}
                    album={track.album}
                    artist={track.artist}
                    listeners={track.listeners}
                    duration={track.duration}
                    name={track.name}
                    url={track.url}
                    streamable={track.streamable} />
                ))}
              </div>
              <div className="more_tracks">
                <a className="link_tracks" href="#">More tracks</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SearchPage