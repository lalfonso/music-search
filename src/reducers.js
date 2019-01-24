import { ADD_TO_LIST, REMOVE_FROM_LIST, START_SEARCH, FINISH_SEARCH, OPEN_MODAL, CLOSE_MODAL, CHANGE_QS } from './actionTypes'

const initialState = {
    searchResult: [],
    selection: [],
    searching: false,
    showModal: false,
    queryString: "",
    pageNumber: 1
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_LIST:
            return Object.assign({}, state, {
                selection: [
                    ...state.selection,
                    action.payload.item
                ]
            });
        case REMOVE_FROM_LIST:
            return Object.assign({}, state, {
                selection:
                    state.selection.filter((item) => {
                        return item.artist + item.name !== action.payload.item.artist + action.payload.item.name
                    })
            });
        case START_SEARCH:
            return Object.assign({}, state, {
                searching: true
            });
        case FINISH_SEARCH:
            return Object.assign({}, state, {
                searching: false,
                searchResult: action.payload.concat ? 
                    state.searchResult.concat(action.payload.results) :
                    action.payload.results
            });
        case OPEN_MODAL:
            return Object.assign({}, state, {
                showModal: true
            });
        case CLOSE_MODAL:
            return Object.assign({}, state, {
                showModal: false
            });
        case CHANGE_QS:
            return Object.assign({}, state, {
                queryString: action.payload.queryString
            });
        default: return state;
    }
}