import axios from 'axios'

const url = "https://memories-backend-api.vercel.app/posts"

export const fetchPosts = () => axios.get(url)

export const createPost = (newPost) => axios.post(url, newPost)

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)

export const deletePost = (id) => axios.delete(`${url}/delete/${id}`)

export const likePost = (id) => axios.patch(`${url}/${id}`);
