import { ADD_TO_LIST, START_SEARCH, FINISH_SEARCH } from './actionTypes';

export const addToList = (item) => ({
    type: ADD_TO_LIST,
    payload: {
        item
    }
})

export const startSearch = () => ({
    type: START_SEARCH
})

export const finishSearch = (results) => {

    return {
        type: START_SEARCH,
        payload: {
            results
        }
    }
}