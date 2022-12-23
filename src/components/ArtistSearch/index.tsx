import React from 'react'
import { TSearchArtistInfo } from '../../types/types'
import BasicImage from '../BasicImage'
import TextInfo from '../TextInfo'

const ArtistSearch = (artist: TSearchArtistInfo) => {
  return (
    <div className="artists_cell">
      <div className="cover">
        <BasicImage src={artist?.image?.[3]['#text'] || 'assets/album_default.png'} />
      </div>
      <TextInfo name={artist?.name} desc={`${artist?.stats.listeners} listeners`} />
    </div>
  )
}

export default ArtistSearch