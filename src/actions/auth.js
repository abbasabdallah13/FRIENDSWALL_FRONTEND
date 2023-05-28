import * as api from '../api'
import { AUTH, END_LOADING, GET_USER_INFO, START_LOADING } from '../constants/actionTypes';

export const signIn = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        dispatch({type:START_LOADING})
        dispatch({ type: AUTH,  payload: data[0]})
        dispatch({type: GET_USER_INFO, payload: data[1]})
        dispatch({type:END_LOADING})
        navigate('/')

    } catch (error) {
        dispatch({ type: AUTH, error: error['response']['data']['message']})
        window.location.reload();
    }
}
export const signUp = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData)

        dispatch({ type: AUTH, payload: data[0]})
        dispatch({type: GET_USER_INFO, payload: data[1]})

        navigate('/')

    } catch (error) {
        console.log(error)
    }
}

export const googleSignInAction = (googleResponseObject) => async(dispatch) => {
    try {
        const { data } = await api.googleSignIn(googleResponseObject);
        dispatch({type: GET_USER_INFO, payload: data[0]})
        dispatch({ type: AUTH, payload: {result: data[0], token: data[1] }})

    } catch (error) {
        console.log(error.message)
    }
}