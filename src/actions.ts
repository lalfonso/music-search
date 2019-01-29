import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getModalMessage, ModalMessageKeys, IModalMessage } from './components/Modal/modalMessages'
import { API_KEY } from './constants';

export const addToList = (item: any) => ({
    type: actionTypes.ADD_TO_LIST,
    payload: {
        item
    }
})

export const removeFromList = (item: any) => ({
    type: actionTypes.REMOVE_FROM_LIST,
    payload: {
        item
    }
})

export const startSearch = () => ({
    type: actionTypes.START_SEARCH
})

export const finishSearch = (results: any[], concat: boolean) => {
    return {
        type: actionTypes.FINISH_SEARCH,
        payload: {
            results,
            concat
        }
    }
}

export const errorSearch = (modalMessage: ModalMessageKeys) => ({
    type: actionTypes.ERROR_SEARCH,
    payload: getModalMessage(ModalMessageKeys.ERROR_SEARCH)
})

export const closeModal = () => ({
    type: actionTypes.CLOSE_MODAL
})

export const openModal = (modalMessage: ModalMessageKeys) => ({
    type: actionTypes.OPEN_MODAL,
    payload: getModalMessage(modalMessage)
})

export const changeQS = (queryString: string) => ({
    type: actionTypes.CHANGE_QS,
    payload: {
        queryString
    }
})

export const search = (queryString: string, pageNumber: number) => {
    return (dispatch: any) => {
        dispatch(startSearch());
        axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${queryString}&api_key=${API_KEY}&page=${pageNumber}&format=json`).
            then(result => {
                dispatch(finishSearch(result.data.results.albummatches.album, pageNumber !== 1));
                if (result.data.results.albummatches.album.length === 0) {
                    dispatch(openModal(ModalMessageKeys.NO_RESULTS));
                }
            })
            .catch(err => {
                dispatch(errorSearch(ModalMessageKeys.ERROR_SEARCH));

            })
    }
}