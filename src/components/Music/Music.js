import React, { Component } from 'react';
import Search from '../Search/Search';
import SongsList from '../SongsList/SongsList';
import axios from 'axios';
import styled from 'styled-components';

import { HEADER_COLOR } from '../../constants';

const Header = styled.section`
    background-color: ${HEADER_COLOR};
    padding: 20px 0px;
`

const API_KEY = '0b752c3927e93e737ebf660eb430c83d';

let timeout;

class Music extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchStr: "",
            results: [],
            albumDetails: null,
            searching: false,
            debunce: 500
        }
    }

    getDataWithFecth(queryString) {
        fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${queryString}&api_key=0b752c3927e93e737ebf660eb430c83d&format=json`)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(result => console.log(result));
    }

    getDataWithAxios(queryString) {
        this.setState({
            searching: true
        })
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${queryString}&api_key=${API_KEY}&format=json`)
            .then(result => {
                this.setState({
                    results: result.data.results.albummatches.album,
                    searching: false
                })
            })
    }

    handleChange = (str) => {
        this.getDataWithAxios(str);
    }

    render() {
        return (
            <div>
                <Header>
                    <Search
                        titleText="Music Search"
                        placeholder="Plese enter a band"
                        onChangeValue={this.handleChange}
                        searching={this.state.searching}
                        debunce={this.state.debunce}
                    />
                </Header>
                <SongsList list={this.state.results} />
                {
                    //this.state.loading && <Loading />
                }
            </div>
        )
    }
}

export default Music;