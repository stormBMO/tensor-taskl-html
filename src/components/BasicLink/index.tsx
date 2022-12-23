import React from 'react'

const BasicLink = ({ text, link = '', selected = false }: { text: string; link?: string; selected?: boolean }) => {
  return (
    <a className={`link ${selected && 'selected'}`} href={link}>{text}</a>
  )
}

export default BasicLink