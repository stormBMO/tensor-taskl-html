import React from 'react'

const SearchMenu = () => {
  return (
    <div className="quick_menu">
      <ul className="table_search">
        <li className="table_cell"><a className="link_table active">Top Results</a></li>
        <li className="table_cell"><a className="link_table">Artists</a></li>
        <li className="table_cell"><a className="link_table">Albums</a></li>
        <li className="table_cell"><a className="link_table">Tracks</a></li>
      </ul>
    </div>
  )
}

export default SearchMenu