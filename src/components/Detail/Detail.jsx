import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Button } from '../Styled/Button';
import { HEADER_COLOR } from '../../constants';

const API_KEY = '0b752c3927e93e737ebf660eb430c83d';

const TimeStr = (props) => {
    let date = new Date(null);
    date.setSeconds(props.secs);
    const timeString = date.toISOString().substr(11, 8);
    return (
        <span>{timeString}</span>
    )
}

const DetailHeader = styled.div`
    background-color: ${HEADER_COLOR};
    display: flex;
`
const ImageContainer = styled.div`
`

const TextContainer = styled.div`
    flex: 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
`

const AlbumContainer = styled.div`
    margin: 10px;
`

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
                this.setState({
                    albumDetails: result.data.album,
                    albumDuration: (result.data.album) ? 
                        result.data.album.tracks.track.reduce((pv, cv) => (pv + Number(cv.duration)), 0) :
                        null
                })
            })
    }

    componentDidMount() {
        const { album, artist } = this.props.match.params;
        this.getAlbumDetails(album, artist);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <DetailHeader>
                    <ImageContainer>
                        {this.state.albumDetails && 
                            <img src={this.state.albumDetails.image[3]['#text']} alt={this.props.match.params.album}/>
                        }
                    </ImageContainer>
                    <TextContainer>
                        <h1>Artist: {this.props.match.params.artist}</h1>
                        <h2>Album Name: {this.props.match.params.album}</h2>
                    </TextContainer>
                </DetailHeader>

                {this.state.albumDetails && (
                    <AlbumContainer>
                        <h3>Album Duration <TimeStr secs={this.state.albumDuration} /> </h3>
                        <span>Tracks:</span>
                        <ul>
                            {this.state.albumDetails && this.state.albumDetails.tracks.track.map((track, idx) => {
                                return <li key={idx}>
                                    <span>{track.name}. Duration: <TimeStr secs={track.duration} /></span>
                                </li>
                            })}

                        </ul>
                        <Button width="95%" onClick={this.goBack}>
                            Go Back
                        </Button>
                        <div className="button" onClick={this.goBack}></div>
                    </AlbumContainer>
                )}
            </div>
        )
    }
}

export default Detail;