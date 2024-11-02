import { Box, Grid, Zoom } from "@mui/material";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../../../components/posts/post/Post";
import Paginate from "../../../components/Pagination";
import noPostsFound from '../../../assets/nopostsfound.png'
import GlobalVariablesContext from "../../../context/globalVariables";
import Spinner from "../../../components/Spinner";

export default function Component({id}) {

 
  const [page, setPage] = useState(1);
  
  const { bannerOrFriends } = useContext(GlobalVariablesContext)

  const {userPosts: posts, isLoading } = useSelector(state => state.posts)
  
  
 
  

  return ( 
    <Box sx={{backgroundColor:'transparent', borderRadius: '8px', height:'100%', margin:'0rem 1rem', display:'flex', alignItems:'center', flexDirection:'column', justifyContent:'space-between'}}>
      <Grid sx={{height:"100%"}} container spacing={3}>
        {
          isLoading ?
            (
              <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%'}}>
                <Spinner />
              </Box> 
            ) :
            (
              <Box>
                {
                  posts.length === 0 ? 
                    (
                      <Box style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#fff', marginTop:'1rem', borderRadius:'8px', padding:'2rem'}}>
                        <img style={{maxWidth:'100%'}}  src={noPostsFound} alt='no posts found' />
                      </Box>
                    ) :
                  ( 
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
                    )
                }
              </Box>
            )
        }
      </Grid>
      <Box className="friend-paginate">
        <Paginate friendId={id} page={page} setPage={setPage} component={'friend'} bannerOrFriends={bannerOrFriends} />
      </Box>
  </Box>
  )
};

