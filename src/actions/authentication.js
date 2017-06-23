import { 
    AUTH_LOGIN, 
    AUTH_LOGIN_SUCCESS, 
    AUTH_LOGIN_FAILURE ,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* LOGIN */
export function loginRequest(username, password) {
    /* dispatch를 파라미터로 갖는 thunk를 리턴 */
    return (dispatch) => {
        dispatch(login());

        return axios.post('/api/account/signin', {username,password})
        .then((response)=>{
            dispatch(loginSuccess(username));
        }).catch((error)=>{
            dispatch(loginFailure());
        });
    }
}

export function login() {
    return {
        type : AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type : AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type : AUTH_LOGIN_FAILURE
    };
}

/* REGISTER */
export function registerRequest(username, password) {
    return (dispatch) => {
        dispatch(register());

        return axios.post('/api/account/signup', { username, password })
            .then((respopnse) => {
                dispatch(registerSuccess());
            }).catch(
                (error) => {
                    dispatch(registerFailure(error.response.data.code));
                }
            );
    };
}

export function register() {
    return {
        type : AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type : AUTH_REGISTER_SUCCESS
    };
}

export function registerFailure(error) {
    return {
        type : AUTH_REGISTER_FAILURE,
        error
    }
}