import React, { Component, Fragment } from 'react';

import Search from '../Search/Search';
import SongsList from '../SongsList/SongsList';
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

export default withFooter(Music, 30);