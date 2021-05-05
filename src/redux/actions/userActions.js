//imported user action types
import { LOGIN_USER, AUTH_USER, CLEAR_USER } from "./types";

//login user action which dispatch user details to reducer
export const loginUser = (userData) => dispatch => {
    return fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(res => res.json()
        .then( userdata => 
                dispatch({
                    type: LOGIN_USER,
                    payload: userdata
                }) ))
        .catch(err => console.log(err));
}

//to auth user action which dispatch user details to reducer
export const AuthUser = () => dispatch => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        const tkn = JSON.parse(localStorage.getItem('jwt'));
        dispatch({
            type: AUTH_USER,
            payload: tkn.payload
        })
    }
}

export const ClearUser = () => dispatch => {
            if (typeof window !== 'undefined') 
            localStorage.removeItem('jwt');
        return fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            method: 'GET'
        })
        .then(res => res.json()
        .then(dispatch({
            type: CLEAR_USER,
            payload: {}
        }))
        )
        .catch(err => console.log(err));
}