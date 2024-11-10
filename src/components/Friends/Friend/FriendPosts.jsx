import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../../posts/post/Post'
import { Box, Typography } from '@mui/material'
import Spinner from '../../Spinner'
import Grid2 from '@mui/material/Unstable_Grid2'
import Paginate from '../../Pagination'

function FriendPosts({ friendId }) {
    const { isLoading, friendPosts } = useSelector( state => state.posts )
    const [pageNumber, setPageNumber] = useState(1);
    const [loader, setLoader] = useState(false)

    useEffect(() => {
      setLoader(isLoading)
    }, [isLoading])
    

  return  (
    <Box sx={{display:'flex', flexDirection:'column', alignItems: 'center', position: 'relative', maxWidth: '100%'}}>
      {
        loader && (
          <Box sx={{position:'absolute', top:'0', left:'0', width: '100%', height:'100%', backgroundColor:'#fff', display: 'flex', justifyContent: 'center', alignItems: 'start', zIndex: '20'}}>
              <Spinner /> 
          </Box>
        )
      }
      <Grid2 container spacing={3} sx={{justifyContent: 'center', width: '100%'}}>
      {
        friendPosts?.length > 0 ? 
        friendPosts?.map((post, i) => (
          <Post key={`friend-post-${i}`} post={post} page={'friend'} />
        )) : (
          <Typography sx={{fontSize: {xs: '14px', zIndex: '10'}}}>No posts yet</Typography>
        ) 
      }
      </Grid2>
      <Box>
        <Paginate friendId={friendId} pageNumber={pageNumber} setPageNumber={setPageNumber} page={"friends"} />
      </Box>
    </Box>
  )
}

export default FriendPosts