import React, { Component, Fragment } from 'react';
import Search from '../Search/Search';
import SongsList from '../SongsList/SongsList';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';

import { startSearch, finishSearch, openModal, closeModal, changeQS } from '../../actions';
import { Button } from '../Styled/Button';
import { Header } from '../Styled/Header';
import Modal from '../Modal/Modal';
import withFooter from '../hoc/withFooter'

const API_KEY = '0b752c3927e93e737ebf660eb430c83d';

const ViewMoreCard = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    position: relative;
    border: 1px solid #DDD;
    min-height: 174px;
    min-width: 174px;
    margin: 2px;
    background-color: green;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #002900f2
    } 
    div {
        display: flex;
        margin: 0 auto;
        align-items: center;

    }
`

class Music extends Component {

    constructor(props) {
        super(props);
        this.state = {
            debunce: 500,
            pageNumber: 1
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
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${queryString}&api_key=${API_KEY}&page=${this.state.pageNumber}&format=json`)
            .then(result => {
                this.props.onFinishSearching(result.data.results.albummatches.album,
                    this.state.pageNumber !== 1);
                if (result.data.results.albummatches.album.length === 0) {
                    this.props.onOpenModal();
                }
            })
    }

    handleChange = (str) => {
        this.props.onChangeQueryString(str);
        this.setState(
            { pageNumber: 1 },
            () => { this.getDataWithAxios(this.props.queryString); }
        )

    }

    viewMore = () => {
        this.setState(
            { pageNumber: this.state.pageNumber + 1 },
            () => { this.getDataWithAxios(this.props.queryString) }
        )
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



                <SongsList list={this.props.results}>
                    {this.props.results.length % 50 === 0 && this.props.results.length > 0 &&
                        <ViewMoreCard onClick={this.viewMore}>
                            {this.props.searching ?
                                <div>Loading...</div> :
                                <div>View More >></div>
                            }
                        </ViewMoreCard>
                    }
                </SongsList>

                {this.props.showModal &&
                    <Modal onClose={this.props.onCloseModal}>
                        <h3>No results</h3>
                        <p>Please search again.</p>
                    </Modal>
                }
            </Fragment>
        )
    }
}


const mapDispathToProps = dispatch => (
    {
        onStartSearching: () => {
            dispatch(startSearch())
        },
        onFinishSearching: (result, concat) => {
            dispatch(finishSearch(result, concat))
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

export default connect(mapStateToProps, mapDispathToProps)(
    withFooter(Music, 30)
);