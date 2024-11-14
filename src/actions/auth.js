import * as api from '../api'
import { AUTH, GET_USER_INFO, LOGIN_ERROR, REGISTER_ERROR } from '../constants/actionTypes';

export const signIn = (setLoading, formData, navigate) => async(dispatch) => {
    try {
        setLoading(true)
        const { data } = await api.signIn(formData)
        localStorage.setItem('user', JSON.stringify(data[0]))
        dispatch({ type: AUTH })
        dispatch({type: GET_USER_INFO, payload: data[1]})
        navigate('/')
    } catch (error) {
        console.log(error)
        dispatch({type: LOGIN_ERROR, payload: error.response.data.error})
        setLoading(false)
    }
}

export const signUp = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        localStorage.setItem('user', JSON.stringify(data[0]))
        dispatch({ type: AUTH })
        dispatch({type: GET_USER_INFO, payload: data[1]})
        navigate('/')
    } catch (error) {
        console.log(error)
        dispatch({type: REGISTER_ERROR, payload: error.response.data.error})
    }
}

export const googleSignInAction = (googleResponseObject, navigate) => async(dispatch) => {
    try {
        const { data } = await api.googleSignIn(googleResponseObject);
        dispatch({type: GET_USER_INFO, payload: data[0]})
        localStorage.setItem('user', JSON.stringify({result: data[2], token: data[1]}))
        dispatch({ type: AUTH })
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}