const getToken = async () => {
    authorize();
    const clientId = '218ecbfb3ecd4d5197a3fef7373cec22';
    const clientSecret = '0780e3f07e0746b39a293a5d5825b4f8';
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

const getArtistId = async (token, searchInput) => {
    const result = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
    })

    const data = await result.json();
    return data;
}

const getAlbums = async (token, artistId) => {
    const result = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_groups=album&market=US&limit=50', {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
    })

    const data = await result.json()
    return data;
        
}

const getGenres = async (token) => {
    const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
    });

    const data = await result.json();
    return data.categories.items;
}

const getPlaylistByGenre = async (token, genreId) => {
    const limit = 10;
    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
    });

    const data = await result.json();
    return data.playlists.items;
}

const getTracks = async (token, tracksEndPoint) => {
    const limit = 10;
    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
    });

    const data = await result.json();
    return data.items;
}

const getTrack = async (token, trackEndPoint) => {
    const result = await fetch(`${tracksEndPoint}`, {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + token}
    });

    const data = await result.json();
    return data;
}

const getMyPlaylists = async (token) => {
    const result = await fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })

    const data = await result.json();
    return data.items;
}

const getMyPlaylistTracks = async (token, playlistId) => {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })

    const data = await result.json();
    return data.items;
}

const getMyId = async (token) => {
    const result = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })

    const data = await result.json();
    return data
}


const apis = {
    getToken,
    getArtistId,
    getAlbums,
    getGenres,
    getPlaylistByGenre,
    getTracks,
    getTrack,
    getMyPlaylists,
    getMyPlaylistTracks,
    getMyId,
}

export default apis;