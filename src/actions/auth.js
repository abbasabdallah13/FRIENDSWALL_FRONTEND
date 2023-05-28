import * as api from '../api'
import { AUTH, GET_USER_INFO } from '../constants/actionTypes';

export const signIn = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH,  payload: data[0]})
        dispatch({type: GET_USER_INFO, payload: data[1]})
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

export const googleSignInAction = (googleResponseObject, navigate) => async(dispatch) => {
    try {
        const { data } = await api.googleSignIn(googleResponseObject);
        dispatch({type: GET_USER_INFO, payload: data[0]})
        dispatch({ type: AUTH, payload: {result: data[2], token: data[1] }})
        navigate('/')


    } catch (error) {
        console.log(error.message)
    }
}