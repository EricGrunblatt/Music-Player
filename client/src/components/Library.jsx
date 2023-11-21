import React from 'react'
import api from '../api/index'

export default function Library() {
  let genres = []  
  const loadGenres = async () => {
    const token = await api.getToken();
    const playlists = await api.getMyPlaylists(token);
    console.log(playlists);

  }

  return (
    <>
      <div className="library">
        <button onClick={() => { loadGenres() }}>Load My Playlists</button>
      </div>
    </>
  )
}
