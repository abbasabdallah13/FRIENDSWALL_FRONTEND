import { combineReducers } from "redux";

import postsReducer from './posts'
import auth from './auth'
import userReducer from "./user";

export const reducers = combineReducers({
    posts: postsReducer, 
    auth,
    user: userReducer
})