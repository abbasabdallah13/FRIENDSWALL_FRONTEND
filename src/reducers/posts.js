import { FETCH_POST, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, COMMENT_ON_POST, START_LOADING, END_LOADING, DELETE_COMMENT, FETCH_USERS_BY_SEARCH, FETCH_POSTS_BY_SEARCH, GET_FRIEND_POSTS, CLEAR_FRIEND_STATE, FETCH_ALL_POSTS } from '../constants/actionTypes';

const postsReducer = (state = { isLoading: false, allPosts:[],post: {comments:[]} ,posts: [], userPosts: [], users: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false }
        case FETCH_POST:
            return {...state, post: action.payload }
        case COMMENT_ON_POST:
            return { ...state, post: action.payload }
        case DELETE_COMMENT:
            return {...state, post:action.payload}
        case FETCH_ALL: //per page
            return {
                ...state, //always spread the state when working with objects
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                users: [],

            }
        case FETCH_ALL_POSTS:
            return{
                ...state,
                allPosts: action.payload
            }
        case GET_FRIEND_POSTS:    
            return {
                ...state, //always spread the state when working with objects
                userPosts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                users: []
            }
        case CLEAR_FRIEND_STATE:
            return {
                ...state, //always spread the state when working with objects
                userPosts: [],
                currentPage: 0,
                numberOfPages: 0,
                users: []
            }
        case FETCH_USERS_BY_SEARCH:
            return {
                ...state,
                posts:[],
                users: action.payload
            }
        case FETCH_POSTS_BY_SEARCH:
            return {
                ...state,
                posts: action.payload,
                users: []
            };
        case CREATE:
            return {...state, posts:[...state.posts, action.payload]};
        case UPDATE:
            return {...state, posts:state.posts.map(post => post._id === action.payload._id ? action.payload : post)};
        case LIKE: 
            return {...state, posts:state.posts.map(post => post._id === action.payload._id ? action.payload : post), post: action.payload};
        case DELETE:
            return {...state, posts:state.posts.filter(post => post._id !== action.payload)};
        default:
            return state;
    }
}

export default postsReducer;