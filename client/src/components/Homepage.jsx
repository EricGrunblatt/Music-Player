import React, { useState, useEffect } from 'react'
import ericProfilePic from '/EricCover.jpg'
import { useNavigate } from 'react-router-dom'

export default function Homepage() {
  const navigate = useNavigate();
  const [goToLibrary, setGoToLibrary] = useState(false);

  useEffect(() => {
    if(!goToLibrary) return;
    navigate("/library");
  })

  return (
    <div className="homepage">
      <div>
        <img src={ericProfilePic} className="logo" alt="Vite logo" style={{height: '300px', width: '300px', borderRadius: '50px'}}/>
      </div>
      <h1>Eric's Music Dashboard</h1>
      <div className="button-options">
        <button onClick={() => { setGoToLibrary(true)}} style={{border: '2px solid black', borderRadius: '10px', width: '200px', margin: '0 25px 0 0'}}>
          Go To Library
        </button>
        <button style={{border: '2px solid black', borderRadius: '10px', width: '200px'}}>
          Go To Personal Music
        </button>
      </div>
    </div>
  )
}
