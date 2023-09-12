import { combineReducers } from "redux";

import postsReducer from './posts'
import auth from './auth'
import userReducer from "./user";

export const reducers = combineReducers({
    posts: postsReducer, // it is posts:posts but because the key and the value are the same, we can put only posts
    auth,
    user: userReducer
})