import React, { useEffect, useState } from "react";
import { CardActions, CardMedia, Button, Typography, Card, Box } from "@mui/material"
import moment from 'moment'
import { navigate } from '@reach/router'
import { useDispatch } from 'react-redux';
import DeleteIcon from "@mui/icons-material/Delete"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { deletePost } from "../../../actions/posts";
import LikeButton from "./LikeButton";
import Grid2 from "@mui/material/Unstable_Grid2";

const Post = ({post, setCurrentId, setCreateMemoryForm, page}) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null)
  
  useEffect(()=>{
    let localStorageUser = JSON.parse(localStorage.getItem('user'));
    setUser(localStorageUser);
    if(localStorageUser?.result._id) setCardActionsState(true);
    if(post?.likes?.indexOf(localStorageUser?.result?._id || localStorageUser?.result?.googleId) === -1){
        setLikeMsg('Like');
    }else{
        setLikeMsg('Unlike');
    }
  },[post])

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [cardActionsState, setCardActionsState] = useState(false);
  const [likeMsg, setLikeMsg] = useState('');

 
  const openPost = () => {
    navigate(`/posts/${post._id}`);
    localStorage.setItem('openedPost',JSON.stringify({...post, comments:[]}));
  }

  const deletePostFunction = (id) => {
    dispatch(deletePost(id));
    window.location.reload();
  }

  const editPost = (e,id) => {
    e.stopPropagation(); 
    window.scrollTo({ top: 200, behavior: 'smooth' });
    setCurrentId(id); 
    setCreateMemoryForm(true);
  }

  const openDeleteModal = (e) => {
    e.stopPropagation();
    setConfirmDeleteModal(true); 
  }



  return (
        <Grid2 size={3} onClick={openPost} sx={{ borderRadius: '15px', position: 'relative', cursor: 'pointer', height: '20rem', width: '15rem'}} >
          <Card sx={{height: '100%', width: '100%'}}>
          {
            confirmDeleteModal ? (
              <Box onClick={(e)=>e.stopPropagation()} sx={{display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', width:'100%', zIndex:'9', backgroundColor:'#f6f8e7'}}> 
                <Typography sx={{margin:'0.5rem', textAlign:'center'}}>Are you sure you want to delete this post ?</Typography>
                <Box sx={{display:'flex', justifyContent:'center', gap:'0.5rem', marginTop:'1rem'}}>
                  <Button variant="outlined" style={{border:'2px solid red'}} onClick={()=>deletePostFunction(post._id)}>Delete</Button>
                  <Button variant="contained" onClick={(e)=>{setConfirmDeleteModal(false)}}>Cancel</Button>
                </Box>
              </Box>
            ) : (
                <Box sx={{position:'relative', height: '100%', display: 'flex', flexDirection: 'column'}}>
                   {
                    (user === post?.creator) && ( 
                        <Button 
                          sx={{position:'absolute', top: '0', right: '0', color: 'white', zIndex: '2'}}
                          onClick={(e)=>{editPost(e, post?._id)}}
                        >
                          <MoreHorizIcon fontSize="large" />
                        </Button>
                    )
                  }
                    <CardMedia sx={{height: '7rem', width:'100%', paddingTop: '56.25%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1', backgroundBlendMode: 'darken' }} image={post.selectedFile} title={post.title} />
                    <Box sx={{padding: '0 4px 4px 4px', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'auto'}}>
                      <Typography sx={{margin: '.3rem', fontSize: '1rem'}} variant="h6" gutterBottom>{post.title}</Typography>
                      <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}</Typography>
                      <Typography variant="overline" color="#b22a00" sx={{fontSize: '10px'}}>{post.tags.map(tag => `#${tag} `).join(' ').slice(0,25)}</Typography>
                      <Box>
                        <Typography variant="body2" textAlign={'right'} sx={{fontSize: '8px'}}>By {post.firstName} {post.lastName}</Typography>
                        <Typography variant="body2" textAlign={'right'} sx={{fontSize: '8px'}}>{moment(post.createdAt).fromNow()}</Typography> 
                      </Box>
                      {
                        cardActionsState && (
                          <CardActions>
                            <LikeButton post={post} likeMsg={likeMsg} setLikeMsg={setLikeMsg} />
                            {
                              (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ) && (
                                <Button size="small" color="primary" onClick={(e) => { openDeleteModal(e) }}>
                                  <DeleteIcon fontSize='small' />
                                  Delete
                                </Button>
                              )
                            }
                          </CardActions>
                        )
                      }
                  </Box>
               </Box>
            )
          }
          </Card>
        </Grid2>
    )
};

export default Post;
