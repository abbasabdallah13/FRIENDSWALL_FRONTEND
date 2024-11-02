import React, { useContext, useEffect, useRef, useState } from "react";
import { Paper, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { navigate, useLocation } from '@reach/router';
import {  deletePost, getPost  } from '../../actions/posts.js'
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop.jsx";
import RecommendedPosts from "../../components/RecommendedPosts.jsx";
import Details from "../../components/Details.jsx";
import GlobalVariablesContext from "../../context/globalVariables.js";
import PostOptions from "../../components/posts/post/PostOptions.jsx";
import Spinner from "../../components/Spinner.jsx";


export default function Component() {
  const dispatch = useDispatch();
  const location = useLocation()

  let regex= /\/posts\//
  let regex2= /\//
  const id = location.pathname.replace(regex,'').replace(regex2, '')
  

  const { allPosts, isLoading } = useSelector( state => state.posts )
  const { scrollToTopButton, setScrollToTopButton, currentId, setCurrentId } = useContext(GlobalVariablesContext)
 
  const [recommendedPosts, setRecommendedPosts] = useState([]); 
  const [postModal, setPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null)
  
  const anywhereClick = useRef(null);
  
  const postCreator = post?.creator === user?.result?._id;

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')));
    setPost(JSON.parse(localStorage.getItem('openedPost')));
  }, [])
      
  useEffect(() => {
    dispatch(getPost(id))
  }, [id]);
  
  useEffect(() => {
    let recommendedPosts = [];
    for(let i=0;i<allPosts?.length;i++){
      for(let j=0;j<allPosts[i]?.tags?.length;j++){
        if(post?.tags?.indexOf(allPosts[i].tags[j]) !== -1){
          recommendedPosts.push(allPosts[i]);
          break;
        }
      }
    }
    recommendedPosts = recommendedPosts.filter(post => post._id !== id);
    setRecommendedPosts(recommendedPosts.length>0?recommendedPosts:post)
  }, [currentId]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 100){
        setScrollToTopButton(true);
      }else{
        setScrollToTopButton(false);
      }
    })
  }, []);



  const deletePostFunc = () => {
    dispatch(deletePost(id))
    navigate('/');
  }

  function useOutsideClicker(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        console.log(event.target)
        if (ref.current && !ref.current.contains(event.target)) {
          console.log(ref.current.contains(event.target))
           setDeletePostModal(false);
           setPostModal(false);
           setEditPostModal(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideClicker(anywhereClick);

  return (
      isLoading ? 
        <Spinner />
      : (
          <Paper sx={{position:'relative', padding: '20px', borderRadius: '15px', width:'100%', height: deletePostModal || editPostModal ? '100vh' : '', overflow: deletePostModal || editPostModal ? 'hidden' : ''}} elevation={6}>
            {
              scrollToTopButton && (
                  <ScrollToTop />
              )
            }
            <PostOptions postCreator={postCreator} postModal={postModal} setPostModal={setPostModal} editPostModal={editPostModal} setEditPostModal={setEditPostModal} deletePostModal={deletePostModal} setDeletePostModal={setDeletePostModal} anywhereClick={anywhereClick} currentId={currentId} setCurrentId={setCurrentId} id={id} />          
            <Details postCreator={postCreator} id={id} user={user} post={post} deletePostFunc={deletePostFunc} />
            {
              recommendedPosts?.length && (
                <RecommendedPosts recommendedPosts={recommendedPosts} />
              )
            }
          </Paper>
        )
  )
};
