import React from 'react'
import { TArtist, TTag } from '../../types/types'
import BasicImage from '../BasicImage'

const Artist = ({ image, name, tags, url }: TArtist) => {
  return (
    <div className="artist_element" onClick={() => { document.location.href = url }}>
      <div className="artist_cover">
        <BasicImage src={image[3]['#text']} />
      </div>
      <div className="artist_name">
        <h4 className="semiheader">{name}</h4>
      </div>
      <div className="artist_genre">
        <p className="planetext">
          {tags?.map((tag: TTag) => tag.name)
            .join(' ')}
        </p>
      </div>
    </div>
  )
}

export default Artist