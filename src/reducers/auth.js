import { AUTH, LOGIN_ERROR, LOGOUT, REGISTER_ERROR } from '../constants/actionTypes.js'

const authReducer = (state = {authData: null, loginError: '', registerError: ''},action) => {
    switch(action.type){
        case AUTH:
            return state;
        case LOGIN_ERROR:
            return {...state, loginError: action.payload}
        case REGISTER_ERROR: 
            return {...state, registerError: action.payload}
        case LOGOUT: 
            return state;
        default:
            return state;
    }
}

export default authReducer