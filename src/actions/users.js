import { END_LOADING, GET_USER_INFO, START_LOADING, UPDATE_USER_INFO, ADD_FRIEND, GET_REQUESTOR_INFO, ACCEPT_FRIEND, DECLINE_FRIEND, GET_FRIEND_DETAILS, GET_FRIEND_POSTS, UNFRIEND } from '../constants/actionTypes'
import * as api from '../api' 


export const getUserInfo = (id) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.getUserInfo(id);
        dispatch({type:GET_USER_INFO, payload:data})
        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error.message)
    }
} 

export const getRequestorsInfo = (id) => async(dispatch) => {
    try {
        const { data } = await api.getRequestorsInfo(id);
        dispatch({type:GET_REQUESTOR_INFO, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const updateUserInfoAction = (id, updatedUserInfo) => async(dispatch) => {
    try {
        const { data } = await api.updateUserInfo(id, updatedUserInfo);
        dispatch({type:UPDATE_USER_INFO, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const addFriendAction = (userId, loggedUser) => async(dispatch) => {
try {
    const { data } = await api.addFriend(userId, loggedUser);
    dispatch({type: ADD_FRIEND, payload: data})
} catch (error) {
    console.log(error.message)
}

}

export const unsendFriendRequest = (userId, loggedUserId) => async(dispatch) => {
    try {
        const { data } = await api.unsendFriendRequest(userId, loggedUserId)
        
    } catch (error) {
        console.log(error.message)
    }
}

export const acceptFriendAction = (id, loggedUser) => async(dispatch) => {
    try {
        const { data } = await api.acceptFriend(id, loggedUser);
        dispatch({type: ACCEPT_FRIEND, payload: data});
    } catch (error) {
        console.log(error.message)
    }
}

export const declineFriendAction = (id, loggedUser) => async(dispatch) => {
    try {
        const { data } = await api.declineFriend(id, loggedUser);
        dispatch({type: DECLINE_FRIEND, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const unfriendAction = (id, loggedUserId) => async(dispatch) => {
    try {
        const { data } = await api.unfriend(id, loggedUserId);
        dispatch({type: UNFRIEND, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const getFriendDetailsAction = (id,page) => async dispatch => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.getFriendDetails(id,page);
        dispatch({type: GET_FRIEND_DETAILS, payload: data[0]});
        dispatch({type: GET_FRIEND_POSTS, payload: data[1]})
        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error.message)
    }
}


