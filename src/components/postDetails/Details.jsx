import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import moment from 'moment'

import { Button, Divider, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete"

import { commentOnPost, deleteCommentAction } from "../../actions/posts";

import LikeButton from "../posts/post/LikeButton";


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
    <div className='section'>
        <h1 className='title'>{post?.title}</h1>
        <p className="tags" color="textSecondary">{post?.tags?.map((tag) => `#${tag} `)}</p>
    <Divider style={{ margin: '20px 0' }} />
        <div className='image-section'>
            <img className="post-img" src={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post?.title} />
        </div>
        <p className="message">{post?.message}</p>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <LikeButton post={postFromDB}/>
            <p className="created-at">Created by: {post?.firstName} {post?.lastName} - {moment(post?.createdAt).fromNow()}</p>
        </div>
    <Divider style={{marginTop:'0.3rem'}} />
    <div>
        <h3>Comments:</h3>
        <form autoComplete="off" noValidate onSubmit={comment} style={{marginTop:'1rem'}}>
          <TextField style={{width: '100%'}} value={userComment.comment} onChange={(e)=>setUserComment({comment:e.target.value})} name="comment" label="Add Comment" variant="outlined" />
            <div style={{display:'flex', justifyContent:'end'}}>
                <Button 
                  disabled={!user?.result}
                  variant="contained" 
                  style={{marginTop:'0.3rem', backgroundColor: user?.result? 'green':'grey', color: 'white'}}
                  type="submit"
                >
                  Comment
                </Button>
              </div>
        </form>   
        <div style={{height: post?.comments?.length > 3 ? '20rem' : 'unset', overflowY: post?.comments?.length > 2 ? 'scroll' : 'unset', marginTop:'1rem'}}>
        {
          !postFromDB?.comments?.length > 0 ? (
            <>
              <p>No comments yet. Be the first to comment !</p> 
            </>
          ) : postFromDB?.comments?.map((object,i) => (
            <div key={i} 
              style={{display:'flex', width:'100%', border:'1px solid black', marginTop: i!==0?'1rem':'0', borderRadius:'5px', position:'relative', padding:'0'}}
            >
              <div style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'10px'}}>
                <img width={'50'} height={'50'} style={{borderRadius:'50%'}} src={object?.picture} alt='user icon' />
                <div style={{padding:'0 5px'}}>
                  <h4>{object?.byName}</h4>
                  <p style={{wordBreak:'break-all'}}>{object?.comment}</p>
                </div>
              </div>
              <p style={{position:'absolute', bottom:'-8px', right:'5px', fontSize:'0.6rem', fontWeight:'700'}}>{object.createdAt?.toString().slice(0,21)}</p>
              {
                (postCreator || object?.byId === user?.result?._id) && (
                  <Button style={{position:'absolute', right:'-5px', top:'0px'}} onClick={()=>{setClickedComment(i)}}><DeleteIcon fontSize="small" style={{fill:'red'}} /></Button>
                )
              }
              {
                clickedComment === i && (
                  <div style={{height:'100%',width: '100%', backgroundColor:'white', display:'flex', flexDirection:'column',position:'absolute',left:'0', top:'0px', borderRadius:'5px', padding:'0.5rem',boxSizing:'border-box'}}>
                    <h4 style={{position:'relative', bottom:'1.3rem', width:'100%'}}>Are you sure you want to delete this comment ?</h4>
                    <div style={{display:'flex', justifyContent:'space-around',position:'relative', bottom:'1.2rem'}}>
                      <Button variant='contained' style={{ backgroundColor:'green', color:'white', height:'1.3rem'}}  onClick={() => deleteComment(id,object._id)}>Yes</Button>
                      <Button variant='contained' style={{ backgroundColor:'red', color:'white', height:'1.3rem' }}  onClick={() => setClickedComment('')}>No</Button>
                    </div>
                  </div>
                )
              }
            </div>
          )).reverse() 
        }
        </div>       
    </div> 
    <Divider style={{ margin: '20px 0' }} />
  </div>
  )
};

export default Details;
