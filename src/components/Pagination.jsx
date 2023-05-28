import React, { useEffect } from "react";

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";

import { Paper } from "@material-ui/core";

import { Pagination, PaginationItem } from '@material-ui/lab'

import { getPostsPerPage } from "../actions/posts";
import { getFriendDetailsAction } from "../actions/users";

import useStyles from './styles'

const Paginate = ({ friendId, page, setPage, component, bannerOrFriends }) => {
  const classes = useStyles();
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
        classes={{ ul: classes.ul }}
        count={numberOfPages} //total number of pages
        page={Number(page) || 1}  //current page
        variant="outlined"
        color="primary"
        renderItem={(item) => {
          if(component === 'home'){
            return (
                  <PaginationItem 
                    {...item} 
                    component={Link} 
                    to={`/${component === 'home'}`} 
                    />
            )}else{
            return (
                  <PaginationItem 
                    {...item} 
                    onClick={() => {
                      setPage(item.page) }
                    }
                  />
                )
          }
        }
        }
       />
    </div>
    </Paper>
  )
};

export default Paginate;
