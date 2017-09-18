import {
    SEARCH,
    SEARCH_SUCCESS,
    SEARCH_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function searchRequest(username) {

    dispatch(search());

    axios.get('/wall/' + username, (err, usernames) => {
        dispatch(searchSuccess(usernames));
    }).catch((error) => {
        dispatch(searchFailure(error.response.data.code));
    });
}

export function search() {
    return {
        type : SEARCH
    }
}

export function searchSuccess(usernames) {
    return {
        type : SEARCH_SUCCESS,
        usernames
    }
}

export function searchFailure(error) {
    return {
        type : SEARCH_FAILURE,
        error
    }
}