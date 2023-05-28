import React, { useEffect, useState } from "react";

import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core"

import moment from 'moment'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux';

import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"

import { deletePost } from "../../../actions/posts";

import LikeButton from "./LikeButton";

import useStyles from './styles'


const Post = ({post, setCurrentId, setCreateMemoryForm}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
        <Card className={classes.card} raised elevation={6} onClick={openPost}>
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
                <div className={classes.overlay2}>
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
          <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.firstName} {post.lastName}</Typography>
            {/* this allows it to say 5mins ago or 5 secs ago */}
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography> 
          </div>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}</Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
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
