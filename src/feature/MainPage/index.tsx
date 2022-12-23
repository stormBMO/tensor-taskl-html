import React, { useEffect, useState } from 'react'
import { api } from '../../api/api-main';
import { TArtist, TTag, TTrack } from '../../types/types';
import Artist from '../../components/Artist';
import Track from '../../components/Track';

const MainPage = () => {
  const [hotArtists, setHotArtists] = useState<TArtist[]>([])
  const [popularTracks, setPopularTracks] = useState<TTrack[]>([])
  const [artistTags, setArtistTags] = useState<TTag[][]>([])
  const [tracksTags, setTracksTags] = useState<TTag[][]>([])


  useEffect(() => {
    (async () => {
      const [tempHotArtists, tempPopularTracks]: [TArtist[], TTrack[]] = await Promise.all([
        api.fetchHotArtists(),
        api.fetchPopularTracks(),
      ])
      setHotArtists(tempHotArtists);
      setPopularTracks(tempPopularTracks)
    })();
  }, [])

  useEffect(() => {
    if (hotArtists && popularTracks) {
      (async () => {
        const [tempArtistTags, tempTracksTags]: [TTag[][], TTag[][]] = [
          await Promise.all(hotArtists.map(
            (hotArtist: TArtist) => api.fetchTagsByArtistName(hotArtist.name)
          )),
          await Promise.all(popularTracks.map(
            (popularTrack: TTrack) =>
              api.fetchTagsByTrack(popularTrack.artist.name, popularTrack.name, popularTrack.mbid)
          ))
        ];
        setArtistTags(tempArtistTags)
        setTracksTags(tempTracksTags)
      })();
    }
  }, [hotArtists, popularTracks])

  return (
    <main>
      <div className="main_content">
        <div className="music_title">
          <h1>Music</h1>
        </div>
        <div className="title_section">
          <h3 className="halfheader">Hot right now</h3>
          <div className="red_line" />
        </div>
        <div className="hot_section">
          {artistTags.length > 0 && hotArtists?.map((artist, i) => (
            <Artist key={artist.mbid || '' + i} image={artist.image} name={artist.name} tags={artistTags[i]?.slice(0, 3)} url={artist.url} />
          ))}
        </div>
        <div className="title_section">
          <h3 className="halfheader">Popular tracks</h3>
          <div className="red_line" />
        </div>
        <div className="popular_section">
          {tracksTags.length > 0 && popularTracks?.map((track, i) => (
            <Track key={track.url + i} image={track.image} name={track.name} tags={tracksTags[i]?.slice(0, 3)} url={track.url} artist={track.artist} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default MainPage