import React, { useEffect } from "react";

import { navigate } from '@reach/router' 

import { useDispatch, useSelector } from "react-redux";

import { Paper } from "@mui/material";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { getPostsPerPage } from "../actions/posts";
import { getFriendDetailsAction } from "../actions/users";


const Paginate = ({ friendId, page, setPage, component, bannerOrFriends }) => {
  const dispatch = useDispatch();
  
  const { numberOfPages } = useSelector(state => state.posts);

  useEffect(() => {
   if(page){
    if(component === 'home'){
      dispatch(getPostsPerPage(page))
    }else if (component === 'friend'){
      dispatch(getFriendDetailsAction(friendId,page))
    }
   }
  }, [page, bannerOrFriends]);
  

  return (
    !numberOfPages ? '' : 
    <Paper elevation={6} style={{padding:'0.5rem', marginTop:'2rem', backgroundColor:'#f6f8e7'}}>
    <div>
       <Pagination
        count={numberOfPages} //total number of pages
        page={Number(page) || 1}  //current page
        variant="outlined"
        color="primary"
        onChange={(e, value) => navigate(`?page=${value}`)}
       />
    </div>
    </Paper>
  )
};

export default Paginate;
