import React from "react";
import { useSelector } from "react-redux";
import Post from "./post/Post";
import Grid2 from "@mui/material/Unstable_Grid2";


const Posts = ({setScrollToTopButton, setCurrentId, setCreateMemoryForm}) => {
    const { posts } = useSelector((state)=>state.posts);

  return (
        <Grid2 container spacing={3} alignItems='stretch'>
            {
                posts?.map((post, i) => (
                    <Post key={`post-${i}`} setScrollToTopButton={setScrollToTopButton} setCreateMemoryForm={setCreateMemoryForm} post={post} setCurrentId={setCurrentId} />
                ))
            }
        </Grid2>
    )
};

export default Posts;
