import { ADD_TO_LIST } from './actionTypes'

const initialState = {
    searchResult: [],
    selection: []
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
    return state;
}