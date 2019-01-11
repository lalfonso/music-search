import React, { Component } from 'react';
import Search from '../Search/Search';
import SongsList from '../SongsList/SongsList';
import axios from 'axios';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { START_SEARCH, FINISH_SEARCH } from '../../actionTypes';
import { startSearch, finishSearch } from '../../actions';
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
            debunce: 500
        }
    }

    getDataWithFecth(queryString) {
        fetch(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${queryString}&api_key=0b752c3927e93e737ebf660eb430c83d&format=json`)
            .then(response => {
                return response.json();
            })
            .then(result => console.log(result));
    }

    getDataWithAxios(queryString) {
        this.props.onStartSearching();
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${queryString}&api_key=${API_KEY}&format=json`)
            .then(result => {
                this.props.onFinishSearching(result.data.results.albummatches.album);
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
                        //searching={this.props.searching}
                        debunce={this.state.debunce}
                    />
                </Header>
                <SongsList list={this.props.results} />
                {
                    //this.state.loading && <Loading />
                }
            </div>
        )
    }
}


const mapDispathToProps = dispatch => (
    {
        onStartSearching: () => {
            dispatch(startSearch())
        },
        onFinishSearching: (result) => {
            dispatch(finishSearch(result))
        }
    }
)

const mapStateToProps = state => (
    {
        searching: state.searching,
        results: state.searchResult
    }
)

export default connect(mapStateToProps, mapDispathToProps)(Music);