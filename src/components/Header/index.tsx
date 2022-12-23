import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import BasicImage from '../BasicImage'
import BasicLink from '../BasicLink'
import ContainerImageButton from '../ContainerImageButton'

const Header = () => {
  const navigate = useNavigate()

  const onClick = useCallback(() => {
    navigate('/search')
  }, [])

  const onLogoClicked = useCallback(() => {
    navigate('/')
  }, [])

  return (
    <header>
      <div className="player">
        <div className="album_pic">
          <BasicImage src='assets/album_default.png' />
        </div>
        <div className="controls">
          <ContainerImageButton className='player_btn prev_btn' src='assets/prev_btn.png' />
          <ContainerImageButton className='player_btn play_btn' src='assets/pause_btn.png' />
          <ContainerImageButton className='player_btn next_btn' src='assets/next_btn.png' />
        </div>
      </div>
      <div className="logo" onClick={onLogoClicked}>
        <BasicImage src='assets/lastfm_logo.svg' />
      </div>
      <div className="actions">
        <div className="search" onClick={onClick}>
          <BasicImage src='assets/search_btn.png' />
        </div>
        <div className="pages">
          <BasicLink link='/' text='Home' />
          <BasicLink text='Live' />
          <BasicLink text='Music' />
          <BasicLink text='Charts' />
          <BasicLink text='Events' />
          <BasicLink text='Features' />
        </div>
        <div className="user">
          <BasicImage src='assets/user_logo.webp' />
        </div>
      </div>
    </header>
  )
}

export default Header