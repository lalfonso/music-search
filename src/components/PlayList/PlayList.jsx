import React, { Component, Fragment } from 'react';
import SongsList from '../SongsList/SongsList';
import { connect } from 'react-redux';

import { openModal, closeModal, changeQS } from '../../actions';
import { Button } from '../Styled/Button';
import { Header } from '../Styled/Header';
import Modal from '../Modal/Modal';

class PlayList extends Component {

    componentDidMount() {
        if (this.props.selection.length === 0) {
            this.props.onOpenModal();
        }
    }

    goBack = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <Fragment>
                <Header>
                    <h1 style={{color: "white"}}>Playlist</h1>
                </Header>
                <SongsList list={this.props.selection} />

                {this.props.showModal ? (
                    <Modal onClose={this.props.onCloseModal}>
                        <h3>Sorry. No items in the playlist</h3>
                        <div className="button" onClick={this.goBack}></div>
                    </Modal>
                ) : null}
                <Button width="95%" onClick={this.goBack}>
                    Go Back
                </Button>
            </Fragment>
        )
    }
}


const mapDispathToProps = dispatch => (
    {
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
        selection: state.selection
    }
)

export default connect(mapStateToProps, mapDispathToProps)(PlayList);