import React, { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { TSearchTrackInfo } from '../../types/types'
import { millisToMinutesAndSeconds } from '../../utils'


const TrackSearch = (track: TSearchTrackInfo) => {
  const location = useLocation()

  const onTrackClick = useCallback(() => {
    location.pathname = track.url
  }, [track])

  return (
    <div className="track_cell">
      <div className="track_info">
        <div className="track_play" onClick={onTrackClick}>
          <img className="inner_img" src="assets/play_button.png" alt="" />
        </div>
        <div className="track_cover">
          <img className="inner_img" src={
            track.album?.image?.[3]['#text'] || 'assets/album_default.png'
          } alt="" />
        </div>
        <div className="track_name">
          <h3 className="halfheader">{track.name}</h3>
        </div>
        <div className="track_artist">{track.artist.name}</div>
      </div>
      <div className="track_time">{millisToMinutesAndSeconds(track.duration)}</div>
    </div>
  )
}

export default TrackSearch