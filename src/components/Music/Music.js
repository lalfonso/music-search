import React, { Component, Fragment } from 'react';
import Search from '../Search/Search';
import SongsList from '../SongsList/SongsList';
import axios from 'axios';
import { connect } from 'react-redux';

import { startSearch, finishSearch, openModal, closeModal, changeQS } from '../../actions';
import { Button } from '../Styled/Button';
import { Header } from '../Styled/Header';
import Modal from '../Modal/Modal';

const API_KEY = '0b752c3927e93e737ebf660eb430c83d';

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
                if (result.data.results.albummatches.album.length === 0) {
                    this.props.onOpenModal();
                }
            })
    }

    handleChange = (str) => {
        this.props.onChangeQueryString(str);
        this.getDataWithAxios(str);
    }

    goToSelection = () => {
        this.props.history.push("/playlist");
    }

    render() {
        return (
            <Fragment>
                <Header>
                    <Search
                        titleText="Music Search"
                        placeholder="Plese enter a band"
                        onChangeValue={this.handleChange}
                        searching={this.props.searching}
                        debunce={this.state.debunce}
                        queryString={this.props.queryString}
                    >
                        {this.props.anySelected &&
                            <Button onClick={this.goToSelection}>
                                View Selection
                            </Button>
                        }
                    </Search>
                </Header>



                <SongsList list={this.props.results} />

                {this.props.showModal ? (
                    <Modal onClose={this.props.onCloseModal}>
                        <h3>No results</h3>
                        <p>Please search again.</p>
                    </Modal>
                ) : null}
            </Fragment>
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
        },
        onCloseModal: () => {
            dispatch(closeModal())
        },
        onOpenModal: () => {
            dispatch(openModal())
        },
        onChangeQueryString: (queryString) => {
            dispatch(changeQS(queryString))
        },
    }
)

const mapStateToProps = state => (
    {
        searching: state.searching,
        results: state.searchResult,
        showModal: state.showModal,
        queryString: state.queryString,
        anySelected: state.selection.length > 0
    }
)

export default connect(mapStateToProps, mapDispathToProps)(Music);