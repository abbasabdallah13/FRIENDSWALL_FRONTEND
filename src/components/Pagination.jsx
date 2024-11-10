import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Paper } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { getFriendPosts, getPostsPerPage } from "../actions/posts";

const Paginate = ({ friendId, pageNumber, setPageNumber, page }) => {
  
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector(state => state.posts);

  useEffect(() => {
      if(page === 'home'){
        dispatch(getPostsPerPage(pageNumber))
      }else if(page === 'friends'){
        dispatch(getFriendPosts(friendId, pageNumber));
      }
  }, [pageNumber, page, friendId, dispatch]);
  

  return (
    !numberOfPages ? '' : 
    <Paper elevation={6} sx={{padding:'0.5rem', marginTop:'2rem', backgroundColor:'#f6f8e7'}}>
      <Box>
        <Pagination
          count={numberOfPages} //total number of pages
          page={Number(pageNumber) || 1}  //current page
          variant="outlined"
          color="primary"
          onChange={(e, value) => {setPageNumber(value); window.scrollTo({top: '0', behavior: 'smooth'})}}
          sx={{display: 'flex', justifyContent: 'center'}}
        />
      </Box>
    </Paper>
  )
};

export default Paginate;
