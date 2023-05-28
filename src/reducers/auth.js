import { AUTH, LOGOUT } from '../constants/actionTypes.js'

const authReducer = (state= {authData: null},action) => {
    switch(action.type){
        case AUTH:
            if(action.payload){
                localStorage.setItem('user',JSON.stringify(action?.payload))
                localStorage.removeItem('error',JSON.stringify(action?.error))
            }else if(action.error){
                localStorage.setItem('error',JSON.stringify(action?.error))
            }
            return state;
        case LOGOUT: 
            localStorage.clear();
            return state;
        default:
            return state;
    }
}

export default authReducer