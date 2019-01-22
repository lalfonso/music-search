import { ADD_TO_LIST, REMOVE_FROM_LIST, START_SEARCH, FINISH_SEARCH, CLOSE_MODAL, OPEN_MODAL, CHANGE_QS } from './actionTypes';

export const addToList = (item) => ({
    type: ADD_TO_LIST,
    payload: {
        item
    }
})

export const removeFromList = (item) => ({
    type: REMOVE_FROM_LIST,
    payload: {
        item
    }
})

export const startSearch = () => ({
    type: START_SEARCH
})

export const finishSearch = (results) => {
    return {
        type: FINISH_SEARCH,
        payload: {
            results
        }
    }
}

export const closeModal = () => ({
    type: CLOSE_MODAL
})

export const openModal = () => ({
    type: OPEN_MODAL
})

export const changeQS = (queryString) => ({
    type: CHANGE_QS,
    payload: {
        queryString
    }

})

