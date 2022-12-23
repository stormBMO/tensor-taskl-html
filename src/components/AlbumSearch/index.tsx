import React from 'react'
import { TSearchAlbum } from '../../types/types'
import BasicImage from '../BasicImage'
import TextInfo from '../TextInfo'

const AlbumSearch = (album: TSearchAlbum) => {
  return (
    <div className="albums_cell">
      <div className="cover">
        <BasicImage src={album.image[3]['#text'] || 'assets/album_default.png'} />
      </div>
      <TextInfo name={album.name} desc={album.artist} />
    </div>
  )
}

export default AlbumSearch