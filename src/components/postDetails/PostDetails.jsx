import React, { useEffect, useRef, useState } from "react";

import { Paper, Button } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

import { useParams, useNavigate } from 'react-router-dom';

import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import Cancel from "@material-ui/icons/Cancel"

import {  deletePost, getPost  } from '../../actions/posts.js'

import ScrollToTop from "../ScrollToTop/ScrollToTop.jsx";
import Form from "../form/Form.js";

import RecommendedPosts from "./RecommendedPosts.jsx";
import LoadingSpinner from "../LoadingSpinner.jsx";

import './index.css'
import Details from "./Details.jsx";

const PostDetails = ({scrollToTopButton, setScrollToTopButton, currentId, setCurrentId}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const user = JSON.parse(localStorage.getItem('user'))
  const post = JSON.parse(localStorage.getItem('openedPost'))

  const { allPosts, isLoading } = useSelector( state => state.posts )
 
  const [recommendedPosts, setRecommendedPosts] = useState([]); 
  const [postModal, setPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  
  const anywhereClick = useRef(null);
  
  const postCreator = post?.creator === user?.result?._id;
      
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
        if (ref.current && !ref.current.contains(event.target)) {
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
    // return loading spinner if loading
      isLoading ? 
        <LoadingSpinner />
      : (
        <>
          {/* scroll to top button in devices positioned absolutely */}
          {
            scrollToTopButton && (
                <ScrollToTop />
            )
          }
          {/* actual page element */}
          <Paper style={{position:'relative', padding: '20px', borderRadius: '15px', width:'100%', height: deletePostModal || editPostModal ? '100vh' : '', overflow: deletePostModal || editPostModal ? 'hidden' : ''}} elevation={6}>
          
          {/* display more icon in case the creator of the post has it opened */}
          {
            postCreator && (
              <div style={{cursor:'pointer', position:'absolute',right:'1rem',top:'1rem'}} onClick={()=>setPostModal(prev=>!prev)}>
                <MoreHorizIcon style={{fontSize:'2rem'}} />
              </div>
            )
          }
          
          {/* display options modal if the creator of the post has it opened */}
          {
            postModal && (
              <div ref={anywhereClick} style={{position:"absolute", top:'2.5rem', right:'1rem', display:'flex', flexDirection:'column',gap:'0.5rem', backgroundColor:'#fff',border:'1px solid black', padding:'1rem'}}>
                <Button onClick={()=>{setPostModal(false);setEditPostModal(true); setCurrentId(id)}} variant="outlined"  style={{}}>
                  Edit Post
                </Button>
                <Button onClick={()=>{setPostModal(false);setDeletePostModal(true)}}  style={{backgroundColor:'red', color:'white'}}>
                  Delete Post
                </Button>
              </div>
            )
          }

          {/* display delete or edit post modals in the middle of the screen based on the option chosen */}
          {
              ( deletePostModal || editPostModal ) && (
                <div style={{position:'absolute', top:'0', left:'0',width: '100%', height:'100vh', backgroundColor:'rgb(0,0,0,0.8)', borderRadius:'15px', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>
                  {
                    deletePostModal ? (
                      <div ref={anywhereClick} style={{padding:'1rem', backgroundColor:'black', borderRadius:'8px', display:'flex', flexDirection:'column', alignItems:'center', width:'75%'}}>
                        <h3>Are you sure you want to delete this post ?</h3>
                        <div>
                          <Button variant="contained" style={{backgroundColor:'red', color:'white', width:"45%"}} onClick={deletePostFunc}>Delete</Button>
                          <Button style={{marginLeft:'1rem', border:'1px solid white',color:'white', width:"45%"}} onClick={()=>setDeletePostModal(false)}>Cancel</Button>
                        </div>
                      </div>
                    ) : editPostModal ? (
                      <div ref={anywhereClick} className='form-container'>
                        <div onClick={()=>setEditPostModal(false)}  style={{cursor:'pointer', position:'absolute', right:'1rem', top:'0', zIndex:'13'}}>
                          <Cancel style={{fill:'#000'}}/>
                        </div>
                        <Form currentId={currentId} setCurrentId={setCurrentId}  setEditPostModal={setEditPostModal} />
                      </div>
                    ) : ''
                  }
                </div>
              )
            }
          
          {/*Post details section  */}
          <Details postCreator={postCreator} id={id} user={user} post={post} />

          {/* Recommended posts section */}
          {
            recommendedPosts.length && (
              <RecommendedPosts recommendedPosts={recommendedPosts} />
            )
          }
        </Paper>
        </>
  )
  )
};

export default PostDetails;
