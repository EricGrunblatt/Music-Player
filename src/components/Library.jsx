import React from 'react'
import api from '../api/index'

export default function Library() {
  let genres = []  
  const loadGenres = async () => {
    const token = await api.getToken();
    const genres = await api.getGenres(token);
    console.log(genres);

  }

  return (
    <>
      <div className="library">
        <button onClick={() => { loadGenres() }}>Load Genres</button>
      </div>
    </>
  )
}
