import React from 'react'
import api from '../api/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react'

export default function Search() {
  const [ searchInput, setSearchInput ] = useState("");
  const [ accessToken, setAccessToken ] = useState("");
  const [ albums, setAlbums ] = useState([]);

  useEffect(() => {
    // Get API Token
    const getToken = async () => {
        const token = await api.getToken();
        setAccessToken(token)
    }
    getToken();
  }, [])

  // Search
  async function search() {
    console.log("Search for " + searchInput);

    // Get request using search to get Artist ID
    var artistId = await api.getArtistId(accessToken, searchInput)
        .then(data => { return data.artists.items[0].id });

    // Get request with Artist ID grab all the albums from that artist
    var returnedAlbums = await api.getAlbums(accessToken, artistId)
        .then(data => { return data.items });

    // Display those albums to the user
    setAlbums(returnedAlbums);
    console.log(returnedAlbums);
  }

  return (
    <>                            
      <div className="search">
        <Container>
            <InputGroup className="mb-3" size="lg">
                <FormControl
                    placeholder="Search For Artist"
                    type="input"
                    onKeyDown={event => {
                        if(event.key == "Enter") search();
                    }}
                    onChange={event => setSearchInput(event.target.value)}
                />
                <Button onClick={event => { search()}}>
                    Search
                </Button>
            </InputGroup>
        </Container>
        <Container>
            <Row className="mx-2 row row-cols-4">
                {albums.map((album, i) => {
                    return (
                        <Card>
                            <Card.Img src={album.images[0].url} />
                            <Card.Body>
                                <Card.Title>{album.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    )
                })}
                        
            </Row>
            
        </Container>
      </div>
    </>
  )
}