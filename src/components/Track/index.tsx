import React from 'react'
import { TTag, TTrack } from '../../types/types'

const Track = ({ artist, image, name, tags, url }: TTrack) => {
  return (
    <div className="song_element" onClick={() => {
      document.location.href = url
    }}>
      < div className="song_cover" >
        <img className="image" src={image[3]['#text']} alt="" />
      </div>
      <div className="song_description">
        <h4 className="semiheader">{name}</h4>
        <h5 className="halfheader">{artist.name}</h5>
        <p className="planetext">
          {tags?.map((tag: TTag) => tag.name)
            .join(' ')}
        </p>
      </div>
    </div >
  )
}

export default Track