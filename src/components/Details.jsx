import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import { commentOnPost, deleteCommentAction } from "../actions/posts";
import LikeButton from "../components/posts/post/LikeButton";

const Details = ({postCreator, id, post, user}) => {
    const dispatch = useDispatch();
    const postFromDB = useSelector(state => state.posts.post);

    const [userComment, setUserComment] = useState({comment:''});
    const [clickedComment, setClickedComment] = useState('');
  

    const comment = (event) => {
        event.preventDefault();
    
        if(userComment.comment.length <= 40 ){
          dispatch(commentOnPost(id, userComment));
          setUserComment({comment:''})
        }else{
          alert('Comment should be maximum 40 characters !')
        }
       
      }
    
      const deleteComment = (id, commentId) => {
        dispatch(deleteCommentAction(id, {commentId: commentId}))
        setClickedComment('')
      }

  return (
    <Box className='section'>
        <Typography variant="h4" >{post?.title}</Typography>
        <Typography variant="body2" color="textSecondary">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
        <Divider sx={{ margin: '20px 0' }} />
        <Box display={'flex'} justifyContent={'center'}>
            <img className="post-img" src={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post?.title} />
        </Box>
        <p className="message">{post?.message}</p>
        <Box sx={{display:'flex', flexDirection: {xs: 'column', lg: 'row'}, justifyContent: {lg: 'space-between'}}} >
            <LikeButton post={postFromDB}/>
            <Typography variant="overline" sx={{fontSize: '.6rem'}} className="created-at">Created by: {post?.firstName} {post?.lastName} - {moment(post?.createdAt).fromNow()}</Typography>
        </Box>
        <Divider style={{marginTop:'0.3rem'}} />
        <Box>
            <h3>Comments:</h3>
            <form autoComplete="off" noValidate onSubmit={comment} style={{marginTop:'1rem'}}>
              <TextField style={{width: '100%'}} value={userComment.comment} onChange={(e)=>setUserComment({comment:e.target.value})} name="comment" label="Add Comment" variant="outlined" />
                <Box display={'flex'} justifyContent={'end'}>
                    <Button 
                      disabled={!user?.result}
                      variant="contained" 
                      style={{marginTop:'0.3rem', backgroundColor: user?.result? 'green':'grey', color: 'white'}}
                      type="submit"
                    >
                      Comment
                    </Button>
                </Box>
            </form>   
            <Box style={{height: post?.comments?.length > 3 ? '20rem' : 'unset', overflowY: post?.comments?.length > 2 ? 'scroll' : 'unset', marginTop:'1rem'}}>
            {
              !postFromDB?.comments?.length > 0 ? (
                  <Typography>No comments yet. Be the first to comment !</Typography> 
              ) : postFromDB?.comments?.map((object,i) => (
                <Box key={i} sx={{display: 'flex', width: '100%', border: '1px solid black', position: 'relative', marginTop: i!==0?'1rem':'0', borderRadius: '5px'}}>
                  <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', padding:'10px'}}>
                    <img width={'50'} height={'50'} style={{borderRadius:'50%'}} src={object?.picture} alt='user icon' />
                    <Box sx={{padding:'0 5px'}}>
                      <Typography variant="body1">{object?.byName}</Typography>
                      <Typography variant="subtitle" style={{wordBreak:'break-all'}}>{object?.comment}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="overline" sx={{position:'absolute', bottom:'-8px', right:'5px', fontSize:'0.6rem'}}>{object.createdAt?.toString().slice(0,21)}</Typography>
                  {
                    (postCreator || object?.byId === user?.result?._id) && (
                      <Button style={{position:'absolute', right:'-5px', top:'0px'}} onClick={()=>{setClickedComment(i)}}><DeleteIcon fontSize="small" style={{fill:'red'}} /></Button>
                    )
                  }
                  {
                    clickedComment === i && (
                      <Box style={{height:'100%',width: '100%', backgroundColor:'white', display:'flex', flexDirection:'column',position:'absolute',left:'0', top:'0px', borderRadius:'5px', padding:'0.5rem',boxSizing:'border-box'}}>
                        <h4 style={{position:'relative', bottom:'1.3rem', width:'100%'}}>Are you sure you want to delete this comment ?</h4>
                        <Box style={{display:'flex', justifyContent:'space-around',position:'relative', bottom:'1.2rem'}}>
                          <Button variant='contained' style={{ backgroundColor:'green', color:'white', height:'1.3rem'}}  onClick={() => deleteComment(id,object._id)}>Yes</Button>
                          <Button variant='contained' style={{ backgroundColor:'red', color:'white', height:'1.3rem' }}  onClick={() => setClickedComment('')}>No</Button>
                        </Box>
                      </Box>
                    )
                  }
                </Box>
              )).reverse() 
            }
            </Box>       
        </Box> 
        <Divider style={{ margin: '20px 0' }} />
    </Box>
  )
};

export default Details;
