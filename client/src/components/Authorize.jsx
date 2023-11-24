import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import api from '../api/index'

export default function Authorize() {
    const navigate = useNavigate();
    var redirectUri = 'http://localhost:5173/'
    const AUTHORIZE = 'https://accounts.spotify.com/authorize'
    const TOKEN = 'https://accounts.spotify.com/api/token'
    let clientId = '', clientSecret = ''

    // ClientId: '218ecbfb3ecd4d5197a3fef7373cec22'
    // ClientSecret: '0780e3f07e0746b39a293a5d5825b4f8'

    useEffect(() => {
        const fetchAccessToken = async () => {
            let token = await getAccessToken();
            (console.log('token: ' + token))
            if(token) {
                navigate("homepage");
                localStorage.setItem('access_token', token.access_token);
                localStorage.setItem('refresh_token', token.refresh_token);
            }
        }
        if(window.location.search.length > 0) {
            fetchAccessToken();
        } 
    })

    const setId = (id) => {
        localStorage.clear();
        localStorage.setItem('client_id', id);
    }

    const setSecret = (sec) => {
        localStorage.setItem('client_sec', sec);
    }

    const callAuthorizationApi = async (body) => {
        try {
            const response = await fetch(TOKEN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret),
                },
                body: body,
            });
    
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    }

    const getAccessToken = () => {
        clientSecret = localStorage.getItem('client_sec').trim();
        clientId = localStorage.getItem('client_id').trim();
        let c = getCode();
        if(!c) {
            console.error('Authorization code is missing or invalid');
            return;
        }
        let body = "grant_type=authorization_code";
        body += "&code=" + c; 
        body += "&redirect_uri=" + encodeURI(redirectUri);
        return callAuthorizationApi(body);
    }

    const getCode = () => {
        let code = null;
        const queryString = window.location.search;
        if(queryString.length > 0) {
            const urlParams = new URLSearchParams(queryString);
            code = urlParams.get('code');
        }
        window.history.pushState("", "", redirectUri); 
        return code;
    }
    
    const authorize = () => {
        let url = AUTHORIZE;
        url += '?client_id=' + localStorage.getItem('client_id').trim();
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
                        onChange={event => setId(event.target.value)}
                    />
                    <FormControl
                        style={{ marginRight: '10px' }}
                        placeholder="Client Secret"
                        type="input"
                        onKeyDown={event => {
                            if(event.key == "Enter") authorize();
                        }}
                        onChange={event => setSecret(event.target.value)}
                    />
                    <Button onClick={event => { authorize() }}>
                        Authorize
                    </Button>
                </InputGroup>
            </div>
            
        </div>
    )
}