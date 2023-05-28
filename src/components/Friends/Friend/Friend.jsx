import { CircularProgress, Container, Grid, Paper, Zoom } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "../../posts/post/Post";
import Paginate from "../../Pagination";
import noPostsFound from '../../../assets/nopostsfound.png'
import './index.css'

const Friend = ({id, bannerOrFriends}) => {
 
  const [page, setPage] = useState(1);
  
  const {userPosts: posts, isLoading } = useSelector(state => state.posts)
  
  
 
  

  return ( 
    <div style={{backgroundColor:'transparent', borderRadius: '8px', height:'100%', margin:'0rem 1rem', display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'space-between'}}>
      <Grid style={{height:"100%"}}  container spacing={3}>
      {
        isLoading ?
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%'}}>
          <CircularProgress />
        </div> :
        <>
        {
          posts.length === 0 ? 
          (
            <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#fff', marginTop:'1rem', borderRadius:'8px', padding:'2rem'}}>
              <img style={{maxWidth:'100%'}}  src={noPostsFound} alt='no posts found' />
            </div>
          ):
          <>
          {
            posts.map(post => (
              <Grid item key={post._id} xs={12} sm={12} md={6}>
                <Zoom in>
                  <Post post={post} />
                </Zoom>
              </Grid>
            ) )
          }
          </>
        }
        </>
      }
      </Grid>
      <div className="friend-paginate">
        <Paginate friendId={id} page={page} setPage={setPage} component={'friend'} bannerOrFriends={bannerOrFriends} />
      </div>
  </div>
  )
};

export default Friend;
