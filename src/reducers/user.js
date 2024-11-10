import { ADD_FRIEND, GET_USER_INFO, UPDATE_USER_INFO, GET_REQUESTOR_INFO, ACCEPT_FRIEND, DECLINE_FRIEND,CLEAR_STATE, GET_FRIEND_DETAILS, CLEAR_FRIEND_STATE, UNFRIEND, GET_USER_INFO_BY_EMAIL, FETCH_USERS_BY_SEARCH } from "../constants/actionTypes"

const userReducer = (state = {loggedUser: {}, user: {}, requestor: {}, friendDetails: {}},action) => {
    switch(action.type){
        case GET_USER_INFO:
            return {...state, loggedUser:action.payload};
        case GET_USER_INFO_BY_EMAIL:
            return {...state, loggedUser:action.payload};
        case GET_REQUESTOR_INFO:
            return {...state, requestor:action.payload}
        case UPDATE_USER_INFO:
            return {...state, loggedUser:action.payload}
        case ADD_FRIEND:
            return {...state, user:action.payload}
        case ACCEPT_FRIEND:
            return {...state, loggedUser:action.payload}
        case DECLINE_FRIEND:
            return {...state, loggedUser:action.payload}
        case UNFRIEND:
            return {...state, loggedUser: action.payload}
        case CLEAR_STATE:
            return {...state, loggedUser: {}}
        case CLEAR_FRIEND_STATE: 
            return {...state, friend:{}}
        case FETCH_USERS_BY_SEARCH:
            return {
                ...state,
                users: action.payload
            }
        case GET_FRIEND_DETAILS:
            return {
                ...state,
                friendDetails: action.payload.friendDetails
            }
        default:
            return state;
    }
}

export default userReducer;