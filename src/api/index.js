import axios from 'axios'

// const API = axios.create({ baseURL:'http://localhost:5000' })
const API = axios.create({ baseURL:'https://memories-backend-api.vercel.app' })

API.interceptors.request.use(req => {
    if(localStorage.getItem('user')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }

    return req;
})

export const fetchPosts = () => API.get('/posts/all')

export const fetchPost = (id) => API.get(`/posts/${id}`)

export const fetchPostsPerPage = (page) => API.get(`/posts?page=${page}`)

export const search = (searchQuery) => API.get(`/posts/search?userSearch=${searchQuery.userSearch}&postSearch=${searchQuery.postSearch || 'none'}&tags=${searchQuery.tags}`)

export const createPost = (newPost) => API.post('/posts', newPost)

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/posts/delete/${id}`)

export const likePost = (id) => {return API.patch(`/posts/like/${id}`)};

export const commentOnPost = (id, comment) => API.patch(`/posts/comment/${id}`, comment)

export const deleteComment = (id, commentId) => API.patch(`posts/comment/delete/${id}`, commentId)

export const signIn = formData => API.post('/users/signin', formData)

export const signUp = formData => API.post('/users/signup', formData)

export const googleSignIn = googleResponseObject => API.post('/users/google-sign-in', googleResponseObject);

export const getUserInfo = id => API.get(`/users/user/${id}`);

export const getRequestorsInfo = id => API.get(`/users/user/${id}`);

export const updateUserInfo = (id, updatedPost) => API.patch(`/users/user/update/${id}`, updatedPost)

export const addFriend = (userId, loggedUser) => API.patch(`/users/user/add/${userId}`, loggedUser)

export const unsendFriendRequest = (userId, loggedUserId) => API.patch(`/users/user/${userId}/unfriend/${loggedUserId}`)

export const acceptFriend = (id, loggedUser) => API.patch(`/users/user/accept/${id}`, loggedUser)

export const declineFriend = (id, loggedUser) => API.patch(`/users/user/decline/${id}`, loggedUser)

export const unfriend = (id, loggedUserId) => API.patch(`users/user/unfriend/${id}/${loggedUserId}`)

export const getFriendDetails = (id, page) => API.get(`/users/friend/${id}?page=${page}`)
