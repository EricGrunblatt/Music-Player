import React, { useState, useEffect } from 'react'
import ericProfilePic from '/EricCover.jpg'
import { useNavigate, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

export default function Authorize() {
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate();
    var redirectUri = 'http://localhost:5173/homepage'
    const AUTHORIZE = 'https://accounts.spotify.com/authorize'

    // ClientId: '218ecbfb3ecd4d5197a3fef7373cec22'
    // ClientSecret: '0780e3f07e0746b39a293a5d5825b4f8'
    
    const authorize = () => {
        let url = AUTHORIZE;
        url += '?client_id=' + clientId;
        url += '&response_type=code';
        url += '&redirect_uri=' + encodeURI(redirectUri);
        url += '&show_dialog=true';
        url += '&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private';
        window.location.href = url;
    }

    return (
        <div className="authorize-page" style={{ margin: '25px 0 0 0'}}>
            <h1>Authorize to use application</h1>
            <div style={{display: 'flex', width: '750px', margin: 'auto' }}>
                <InputGroup className="mb-3" size="md" style={{ marginRight: '10px' }}>
                    <FormControl
                        style={{ marginRight: '10px' }}
                        placeholder="Client ID"
                        type="input"
                        onKeyDown={event => {
                            if(event.key == "Enter") authorize();
                        }}
                        onChange={event => setClientId(event.target.value)}
                    />
                    <FormControl
                        style={{ marginRight: '10px' }}
                        placeholder="Client Secret"
                        type="input"
                        onKeyDown={event => {
                            if(event.key == "Enter") authorize();
                        }}
                        onChange={event => setClientSecret(event.target.value)}
                    />
                    <Button onClick={event => { authorize() }}>
                        Authorize
                    </Button>
                </InputGroup>
            </div>
            
        </div>
    )
}