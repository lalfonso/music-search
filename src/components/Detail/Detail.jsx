import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = '0b752c3927e93e737ebf660eb430c83d';

class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albumDetails: null
        }
    }

    getAlbumDetails(album, artist) {
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${album}&format=json`)
        .then(result => {
            debugger
            this.setState({
                albumDetails: result.data.album
            })
        })
    }

    componentDidMount () {
        const { album, artist } = this.props.match.params;
        this.getAlbumDetails(album, artist);
      }

    render() {
        return (
            <div>
                <h1>
                Detail Page for
                </h1>
                <h3>Artist: {this.props.match.params.artist}</h3>
                <h3>Album: {this.props.match.params.album}</h3>

                <span>Tracks:</span>
                <ul>
                    {this.state.albumDetails && this.state.albumDetails.tracks.track.map( track => {
                        return <li>{track.name}</li>
                    }  )}

                </ul>

                <Link to="/">Go to Home</Link>        
            </div>

        )
    }
}

export default Detail;