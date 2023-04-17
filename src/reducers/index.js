import { combineReducers } from "redux";

import posts from './posts'

export const reducers = combineReducers({
    posts, // it is posts:posts but because the key and the value are the same, we can put only posts
})