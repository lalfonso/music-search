import React, { Component, Fragment } from 'react';
import Search from '../Search/Search';
import SongsList from '../SongsList/SongsList';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { search, closeModal, changeQS } from '../../actions';
import { IModalMessage } from '../Modal/modalMessages';
import { Button } from '../Styled/Button';
import { Header } from '../Styled/Header';
import Modal from '../Modal/Modal';
import withFooter from '../hoc/withFooter';

class Music extends Component {

    constructor(props) {
        super(props);
        this.state = {
            debunce: 500,
            pageNumber: 1
        }
    }

    search = (str) => {
        debugger
        this.setState(
            { pageNumber: 1 },
            () => {
                this.props.onChangeQueryString(str);
                this.props.onSearch(str, this.state.pageNumber);
            }
        )
    }

    viewMore = () => {
        this.setState(
            { pageNumber: this.state.pageNumber + 1 },
            () => {
                this.props.onSearch(this.props.queryString, this.state.pageNumber)
            }
        )
    }

    goToSelection = () => {
        this.props.history.push("/playlist");
    }

    render() {
        const { searching, queryString, anySelected, showModal, modalMessage, results } = this.props;
        return (
            <Fragment>
                <Header>
                    <Search
                        titleText="Music Search"
                        placeholder="Please enter a band"
                        onChangeValue={this.search}
                        searching={searching}
                        debunce={this.state.debunce}
                        queryString={queryString}
                    >
                        {anySelected &&
                            <Button onClick={this.goToSelection}>
                                View Selection
                            </Button>
                        }
                    </Search>
                </Header>

                <SongsList list={results} searching={searching} viewMore={this.viewMore}/>

                {showModal &&
                    <Modal onClose={this.props.onCloseModal}>
                        <h3>{modalMessage.title}</h3>
                        <p>{modalMessage.message}</p>
                    </Modal>
                }
            </Fragment>
        )
    }
}


const mapDispatchToProps = dispatch => (
    {
        onSearch: (queryString, pageNumber) => {
            dispatch(search(queryString, pageNumber))
        },
        onCloseModal: () => {
            dispatch(closeModal())
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
        anySelected: state.selection.length > 0,
        modalMessage: state.modalMessage
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(
    withFooter(Music, 30)
);