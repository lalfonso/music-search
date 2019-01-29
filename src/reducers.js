import * as actionTypes from './actionTypes';
import { IModalMessage } from './components/Modal/modalMessages';

const initialState = {
    searchResult: [],
    selection: [],
    searching: false,
    showModal: false,
    queryString: "",
    pageNumber: 1,
    modalMessage: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_LIST:
            return Object.assign({}, state, {
                selection: [
                    ...state.selection,
                    action.payload.item
                ]
            });
        case actionTypes.REMOVE_FROM_LIST:
            return Object.assign({}, state, {
                selection:
                    state.selection.filter((item) => {
                        return item.artist + item.name !== action.payload.item.artist + action.payload.item.name
                    })
            });
        case actionTypes.START_SEARCH:
            return Object.assign({}, state, {
                searching: true
            });
        case actionTypes.FINISH_SEARCH:
            return Object.assign({}, state, {
                searching: false,
                modalMessage: action.payload,                
                searchResult: action.payload.concat ?
                    state.searchResult.concat(action.payload.results) :
                    action.payload.results
            });
        case actionTypes.ERROR_SEARCH:
            return Object.assign({}, state, {
                showModal: true,
                searching: false,
                modalMessage: action.payload
            });
        case actionTypes.OPEN_MODAL:
            return Object.assign({}, state, {
                showModal: true,
                modalMessage: action.payload
            });
        case actionTypes.CLOSE_MODAL:
            return Object.assign({}, state, {
                showModal: false
            });
        case actionTypes.CHANGE_QS:
            return Object.assign({}, state, {
                queryString: action.payload.queryString,
                pageNumber: action.payload.pageNumber
            });
        default: return state;
    }
}