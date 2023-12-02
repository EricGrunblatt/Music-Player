import React from 'react'
import api from '../api/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Player() {
  const location = useLocation();
  const [ accessToken, setAccessToken ] = useState("");
  const [ paused, setPause ] = useState(true);
  const trackToPlay = location.state?.track || 'No data received';

  useEffect(() => {
    console.log(trackToPlay);
    setAccessToken(localStorage.getItem('access_token'));
  })

  async function getDevices() {
    const devices = await api.getDevices(accessToken);
    return devices;
  }

  async function playPause() {
    // If paused, call play function from api, otherwise pause it
    if(paused) {
      // Get devices first
      const dev = await getDevices();
      if(dev.length === 0) {
        console.log("No devices found");
        return;
      }
      // Create body for the track and make the play call
      const reqBody = JSON.stringify({ uris: [trackToPlay.track.uri] });
      console.log(reqBody);
      const play = await api.playSong(accessToken, reqBody, dev[0].id);

    } else {
      const stop = await api.pauseSong(accessToken);
    }
    setPause(!paused);
  }

  async function nextSong() {
    await api.startNextSong(accessToken);
  }

  async function prevSong() {
    await api.startPrevSong(accessToken);
  }

  return (
    <>                            
      <div className="player">
        <Container>
            <Card style={{ width: "400px", height: "600px", alignItems: 'center' }}>
                <Card.Img src={trackToPlay.track.album.images[0].url} style={{ maxWidth: "300px", maxHeight: "300px"}}></Card.Img>
                <Card.Title></Card.Title>
                <Card.Body>
                  <div className="playback-buttons" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <Button className="next-button" style={{ display: 'flex', marginRight: '5px' }} onClick={() => nextSong() }>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-start-fill" viewBox="0 0 16 16">
                        <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0z"/>
                      </svg>
                    </Button>

                    <Button className="play-pause-button" style={{ display: 'flex', marginRight: '5px' }} onClick={() => playPause()}>
                      {paused ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg> : 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause-fill" viewBox="0 0 16 16">
                        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                      </svg>
                      }
                    </Button>

                    <Button className="next-button" style={{ display: 'flex', marginRight: '5px' }} onClick={() => prevSong() }>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-end-fill" viewBox="0 0 16 16">
                        <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0z"/>
                      </svg>
                    </Button>

                  </div>
                  
                </Card.Body>
            </Card>
        </Container>
      </div>
    </>
  )
}