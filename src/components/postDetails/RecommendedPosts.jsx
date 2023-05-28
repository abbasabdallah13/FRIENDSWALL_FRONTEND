import React from "react";

import { useNavigate } from "react-router-dom";

import { Card, Grid, Typography } from "@material-ui/core";

import Favorite from "@material-ui/icons/Favorite.js"


const RecommendedPosts = ({recommendedPosts}) => {
    const navigate = useNavigate()

    const openPost = (post) => {
        navigate(`/posts/${post?._id}`);
        localStorage.setItem('openedPost',JSON.stringify({...post, comments:[]}))
    }

  return (
    <div>
        <Typography gutterBottom variant="h5"> You might also like:</Typography>
        <Grid container spacing={1}  className="recommended-posts">
            {
                recommendedPosts?.map((post, i) => (
                    i < 6 && (
                    <Grid item xs={12} sm={6} md={4} key={post._id} >
                        <Card className="recommended-post-card" onClick={() => openPost(post)} key={post._id}>
                            <h2>{post.title}</h2>
                            <Typography gutterBottom variant="subtitle2">{post.name}</Typography>
                            <Typography gutterBottom variant="subtitle2">{post.message.slice(0,25)}...</Typography>
                            <Typography gutterBottom variant="subtitle2" style={{display:'flex', alignItems:'center'}}><Favorite style={{fill:'red', fontSize:'20px'}}/> &nbsp;{post.likes?.length}</Typography>
                            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                            <img className='card-img' src={post.selectedFile} />
                            </div>
                        </Card>
                    </Grid>
                    )
                ))
            }
        </Grid>
    </div>
  )
};

export default RecommendedPosts;
