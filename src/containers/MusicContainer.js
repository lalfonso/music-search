import { connect } from 'react-redux';

import Music from '../components/Music/Music'
import { search, closeModal, changeQS } from '../actions';

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

export default connect(mapStateToProps, mapDispatchToProps)(Music);