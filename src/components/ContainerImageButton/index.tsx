import React from 'react'
import BasicImage from '../BasicImage';

const ContainerImageButton = ({ className, src }: { className: string; src: string }) => {
  return (
    <button disabled className={`btn ${className}`}>
      <BasicImage src={src} />
    </button>
  )
}

export default ContainerImageButton