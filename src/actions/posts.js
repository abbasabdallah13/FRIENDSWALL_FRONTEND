import * as api from '../api'
import { FETCH_ALL_POSTS } from '../constants/actionTypes';
import { FETCH_POST, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, COMMENT_ON_POST, DELETE_COMMENT, FETCH_USERS_BY_SEARCH, FETCH_POSTS_BY_SEARCH, GET_FRIEND_POSTS } from '../constants/actionTypes';

export const getPost = (id) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchPost(id)
        dispatch({ type: FETCH_POST, payload: data })
        dispatch({type: END_LOADING});

    } catch (error) {
        
    }
}

export const getPostsPerPage = (page) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPostsPerPage(page);
        dispatch({type: FETCH_ALL, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error.message )
    }
}

export const getPosts = () => async(dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({type:FETCH_ALL_POSTS, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const searchAction = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data: { data } } = await api.search(searchQuery)
        if(searchQuery.userSearch){
            dispatch({type: FETCH_USERS_BY_SEARCH, payload: data})
        }else{
            dispatch({type: FETCH_POSTS_BY_SEARCH, payload: data})
        }
        dispatch({type: END_LOADING})

    } catch (error) { 
        console.log(error.message)
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data})
        navigate(`/posts/${data._id}`)
        dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error.message)
    }
    
}

export const updatePost = (id,post) => async(dispatch) =>{
    try {
        const { data } = await api.updatePost(id, post)

        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const commentOnPost = (id, comment) => async(dispatch) => {
    try {
        const { data } = await api.commentOnPost(id, comment);

        dispatch({ type: COMMENT_ON_POST, payload: data})
    } catch (error) {
        console.log(error.message)
    }
  }

  export const deleteCommentAction = (id, commentId) => async(dispatch) => {
    try {
        const { data } = await api.deleteComment(id, commentId);
        dispatch({type: DELETE_COMMENT, payload: data})
    } catch (error) {
        console.log(error.message)
    }
  }