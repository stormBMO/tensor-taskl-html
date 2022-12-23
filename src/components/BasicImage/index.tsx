import React from 'react'

const BasicImage = ({ src }: { src: string }) => {
  return (
    <img className="image" src={src} alt="" />
  )
}

export default BasicImage