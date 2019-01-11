import { ADD_TO_LIST, START_SEARCH, FINISH_SEARCH } from './actionTypes'

const initialState = {
    searchResult: [],
    selection: [],
    searching: false
}

export const reducer = (state = initialState, action) => {
    if (action.type === ADD_TO_LIST) {
        return Object.assign({}, state, {
            selection: [
                ...state.selection,
                action.payload.item
            ]
        })
    }
    if (action.type === START_SEARCH) {
        return Object.assign({}, state, {
            searching: true
        })
    }
    if (action.type === FINISH_SEARCH) {
        return Object.assign({}, state, {
            searchResult: action.payload.results
        })
    }
    return state;
}