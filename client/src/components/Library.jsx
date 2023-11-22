import React, { useState, useEffect } from 'react'
import api from '../api/index'

export default function Library() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = await api.getToken();
      setAccessToken(token);
    }
    getToken();
  })
 
  async function myArtists() {
    const artists = await api.getMyTopArtists(accessToken);
    console.log(artists);

  }

  return (
    <>
      <div className="library">
        <button onClick={() => { myArtists() }}>Load My Artists</button>
      </div>
    </>
  )
}
