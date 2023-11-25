import React, { useState, useEffect } from 'react'
import api from '../api/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

export default function Library() {
  const [accessToken, setAccessToken] = useState("");
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [showTracks, setShowTracks] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);

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
        <button onClick={() => { myPlaylists() }}>Load My Playlists</button>
        { showPlaylists ? <Container className="playlists">
            <Row className="mx-2 row row-cols-4">
                {playlists.map((playlist, index) => {
                    return (
                        <Card key={index} onClick={() => { myPlayListTracks(index) }}>
                            <Card.Img src={playlist.images[0].url} />
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
                        <Card key={index}>
                            <Card.Img src={track.track.album.images[0].url} />
                            <Card.Body>
                                <Card.Title>{track.track.name}</Card.Title>
                                <Card.Text>By: {track.track.artists.map((artist) => { artist.name + ","}) }</Card.Text>
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
