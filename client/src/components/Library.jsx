import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

export default function Library() {
  const [accessToken, setAccessToken] = useState("");
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [showTracks, setShowTracks] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken(localStorage.getItem('access_token'));
  })
 
  async function myPlaylists() {
    const playlistsReceived = await api.getMyPlaylists(accessToken);
    setPlaylists(playlistsReceived);
    console.log(playlistsReceived);
    setShowPlaylists(true);
    setShowTracks(false);
  }

  async function myPlayListTracks(index) {
    let playlistId = playlists[index].id;
    const tracksReceived = await api.getMyPlaylistTracks(accessToken, playlistId);
    setTracks(tracksReceived);
    console.log(tracksReceived);
    setShowPlaylists(false);
    setShowTracks(true);
  }

  return (
    <>
      <div className="library">
        <button className="library-back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </button>
        <button onClick={() => { myPlaylists() }}>Load My Playlists</button>
        { showPlaylists ? <Container className="playlists">
            <Row className="mx-2 row row-cols-4">
                {playlists.map((playlist, index) => {
                    return (
                        <Card key={index} onClick={() => { myPlayListTracks(index) }}>
                            <Card.Img src={playlist.images[0].url} style={{ marginTop: '10px', maxHeight: '275px' }} />
                            <Card.Body>
                                <Card.Title>{playlist.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    )
                })}      
            </Row>
        </Container> : null }
        { showTracks ? <Container className="tracks">
            <Row className="mx-2 row row-cols-4">
                {tracks.map((track, index) => {
                    return (
                        <Card key={index} onClick={() => navigate("/player", { state: { track: track }}) }>
                            <Card.Img src={track.track.album.images[0].url} style={{ marginTop: '10px', maxHeight: '275px' }}/>
                            <Card.Body>
                                <Card.Title>{track.track.name}</Card.Title>
                                <Card.Text>By: {track.track.artists[0].name}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}      
            </Row>
        </Container> : null }
      </div>
    </>
  )
}
