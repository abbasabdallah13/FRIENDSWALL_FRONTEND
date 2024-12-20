import axios from 'axios'

// const API = axios.create({ baseURL:'http://192.168.0.103:5000' })
// const API = axios.create({ baseURL:'http://localhost:5000' })
// const API = axios.create({ baseURL:'https://memories-backend-api.vercel.app' })
const API = axios.create({ baseURL:'https://friendswall-backend.onrender.com' })


API.interceptors.request.use(req => {
        if(localStorage.getItem('user')){
            req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
        }
    return req;
})

export const fetchPosts = () => API.get('/posts/all')

export const fetchPost = (id) => API.get(`/posts/${id}`)

export const fetchPostsPerPage = (page) => API.get(`/posts?page=${page}`)

export const postsSearch = (searchQuery) => API.get(`/posts/search?postSearch=${searchQuery.postSearch || 'none'}&tags=${searchQuery.tags || 'none'}`)

export const userSearch = (searchQuery) => API.get(`/users/search?userSearch=${searchQuery.userSearch}`)

export const createPost = (newPost) => API.post('/posts', newPost)

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/posts/delete/${id}`)

export const likePost = (id) => {return API.patch(`/posts/like/${id}`)};

export const commentOnPost = (id, comment) => API.patch(`/posts/comment/${id}`, comment)

export const deleteComment = (id, commentId) => API.patch(`posts/comment/delete/${id}`, commentId)

export const getFriendPosts = (id, pageNum) => API.get(`/posts/friend/${id}?page=${pageNum}`) 

export const signIn = formData => API.post('/users/signin', formData)

export const signUp = formData => API.post('/users/signup', formData)

export const googleSignIn = googleResponseObject => API.post('/users/google-sign-in', googleResponseObject);

export const getUserInfo = id => API.get(`/users/user/${id}`);

export const getUserInfoByEmail = email => API.post(`/users/user`, email);

export const getRequestorsInfo = id => API.get(`/users/user/${id}`);

export const updateUserInfo = (id, updatedPost) => API.patch(`/users/user/update/${id}`, updatedPost)

export const addFriend = (userId, loggedUser) => API.patch(`/users/user/add/${userId}`, loggedUser)

export const unsendFriendRequest = (userId, loggedUserId) => API.patch(`/users/user/${userId}/unfriend/${loggedUserId}`)

export const acceptFriend = (id, loggedUser) => API.patch(`/users/user/accept/${id}`, loggedUser)

export const declineFriend = (id, loggedUser) => API.patch(`/users/user/decline/${id}`, loggedUser)

export const unfriend = (id, loggedUserId) => API.patch(`users/user/unfriend/${id}/${loggedUserId}`)

export const getFriendDetails = (id) => API.get(`/users/friend/${id}`)

