import React from "react";

import { useSelector } from "react-redux";

import { Grid } from "@mui/material"

import Post from "./post/Post";


const Posts = ({setScrollToTopButton, setCurrentId, setCreateMemoryForm}) => {
    const { posts } = useSelector((state)=>state.posts);

  return (
        <Grid container alignItems='stretch' columnSpacing={3} rowSpacing={3}>
            {
                posts?.map(post => (
                    <Post setScrollToTopButton={setScrollToTopButton} setCreateMemoryForm={setCreateMemoryForm} post={post} setCurrentId={setCurrentId} />
                ))
            }
        </Grid>
    )
};

export default Posts;
