import React from 'react'

const TextInfo = ({ name, desc }: { name: string; desc: string }) => {
  return (
    <div className="text">
      <div className="name">
        <h3 className="halfheader">{name}</h3>
      </div>
      <div className="descriptions_cell">
        <p className="planetext">{desc}</p>
      </div>
    </div>
  )
}

export default TextInfo