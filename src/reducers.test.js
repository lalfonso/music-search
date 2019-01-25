import { reducer } from './reducers';
import * as actionTypes from './actionTypes';

describe('reducers', () => {

    const initialState = {
        searchResult: [],
        selection: [],
        searching: false,
        showModal: false,
        queryString: "",
        pageNumber: 1
    };

    it('should set the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should set searching flag upon search', () => {
        expect(reducer(initialState, {
            type: actionTypes.START_SEARCH
        })).toEqual({
            searchResult: [],
            selection: [],
            searching: true,
            showModal: false,
            queryString: "",
            pageNumber: 1
        });
    })

    it('should concatenate lists when paginating', () => {
        const currentSelection = [{
            artist: 'a1',
            name: 'n1'
        },
        {
            artist: 'a2',
            name: 'n2'
        }];
        const currentState = Object.assign({}, initialState, {
            searchResult: currentSelection
        });

        expect(reducer(currentState, {
            type: actionTypes.FINISH_SEARCH,
            payload: {
                concat: true,
                results: [
                    {
                        artist: 'a3',
                        name: 'n3'
                    }
                ]
            }
        })).toEqual({
            searchResult: [{
                artist: 'a1',
                name: 'n1'
            },
            {
                artist: 'a2',
                name: 'n2'
            },
            {
                artist: 'a3',
                name: 'n3'
            }],
            selection: [],
            searching: false,
            showModal: false,
            queryString: "",
            pageNumber: 1
        })
    })
})