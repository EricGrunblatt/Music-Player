import React from 'react'
import api from '../api/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Player() {
  const location = useLocation();
  const [ accessToken, setAccessToken ] = useState("");
  const trackToPlay = location.state?.track || 'No data received';

  useEffect(() => {
    console.log(trackToPlay);
    setAccessToken(localStorage.getItem('access_token'));
  })

  return (
    <>                            
      <div className="player">
        <Container>
            <Card style={{ width: "400px", height: "600px", textAlign: 'center' }}>
                <Card.Img src={trackToPlay.track.album.images[0].url} style={{ maxWidth: "300px", maxHeight: "300px"}}></Card.Img>
                <Card.Title></Card.Title>
                <Card.Body></Card.Body>
            </Card>
        </Container>
      </div>
    </>
  )
}