import React, { useEffect, useState } from "react";

import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@mui/material"

import moment from 'moment'

import { navigate } from '@reach/router'

import { useDispatch } from 'react-redux';

import DeleteIcon from "@mui/icons-material/Delete"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

import { deletePost } from "../../../actions/posts";

import LikeButton from "./LikeButton";



const Post = ({post, setCurrentId, setCreateMemoryForm}) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('user'))

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
 
  const openPost = () => {
    navigate(`/posts/${post._id}`)
    localStorage.setItem('openedPost',JSON.stringify({...post, comments:[]}))
  }

  const deletePostFunction = (id) => {
    dispatch(deletePost(id))
    window.location.reload();
  }

  const editPost = (e,id) => {
    e.stopPropagation(); 
    window.scrollTo({ top: 200, behavior: 'smooth' });
    setCurrentId(id); 
    setCreateMemoryForm(true)
  }

  const openDeleteModal = (e) => {
    e.stopPropagation();
    setConfirmDeleteModal(true); 
  }

  return (
        <Card raised elevation={6} onClick={openPost} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '15px', height: '100%', position: 'relative', cursor: 'pointer', height: '25rem'}} >
          {
            confirmDeleteModal ? (
              <div onClick={(e)=>e.stopPropagation()} style={{display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', width:'100%', zIndex:'9', backgroundColor:'#f6f8e7'}}> 
                <h2 style={{margin:'0.5rem', textAlign:'center'}}>Are you sure you want to delete this post ?</h2>
                <div style={{display:'flex', justifyContent:'center', gap:'0.5rem', marginTop:'1rem'}}>
                  <Button variant="outlined" style={{border:'2px solid red'}} onClick={()=>deletePostFunction(post._id)}>Delete</Button>
                  <Button variant="contained" onClick={(e)=>{setConfirmDeleteModal(false)}}>Cancel</Button>
                </div>
              </div>
            ):(
              <>
                         {
              (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ) && (  
                <div sx={{position:' absolute', top: '20px', right: '20px', color: 'white'}}>
                  <Button 
                    style={{color: 'white', position:'relative', bottom:'1.5rem', left: '1.5rem'}} 
                    size="small" 
                    onClick={(e)=>{editPost(e, post?._id)}}
                  >
                    <MoreHorizIcon fontSize="large" />
                  </Button>
                </div>
              )
            }
          <CardMedia sx={{height: '7rem', paddingTop: '56.25%', backgroundColor: 'rgba(0, 0, 0, 0.5)',backgroundBlendMode: 'darken' }}  image={post.selectedFile} title={post.title} />
          <div style={{color: 'black', padding: '5px'}}>
            <Typography variant="h6">{post.firstName} {post.lastName}</Typography>
            {/* this allows it to say 5mins ago or 5 secs ago */}
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> 
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', margin: '5px'}}>
            <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
          </div>
          <Typography sx={{padding: '0 16px'}} variant="h5" gutterBottom>{post.title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}</Typography>
          </CardContent>
          <CardActions sx={{padding: '0 16px 8px 16px', display: '', justifyContent: 'space-between'}}>
            <LikeButton post={post} />
            {
              (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ) && (
            <Button size="small" color="primary" onClick={(e) => { openDeleteModal(e) }}>
              <DeleteIcon fontSize='small'  />
              Delete
            </Button>
              )
            }
          </CardActions>
              </>
            )
          }

        </Card>
    )
};

export default Post;
