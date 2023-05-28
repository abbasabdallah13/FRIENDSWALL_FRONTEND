import React from "react";

import { useSelector } from "react-redux";

import { Grid, CircularProgress } from "@material-ui/core"

import Post from "./post/Post";


const Posts = ({setScrollToTopButton, setCurrentId, setCreateMemoryForm}) => {
    const { users, posts, isLoading } = useSelector((state)=>state.posts);

    if(!posts.length && !isLoading && users.length === 0 ) return <p>No posts found</p>

    if(users === 'No Users Found!') return <p>No Users Found!</p>

  return (
       isLoading ? 
        <div style={{ display: 'flex', justifyContent:'center', marginTop:'10rem'}}>
            <CircularProgress  />
        </div> : (
        <Grid container alignItems='stretch' spacing={3}>
            {
                posts.map(post => (
                    <Grid item key={post._id} xs={12} sm={6} md={6} lg={3}>
                        <Post setScrollToTopButton={setScrollToTopButton} setCreateMemoryForm={setCreateMemoryForm} post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))
            }
        </Grid>
        )
    )
};

export default Posts;
