import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { Button } from "@mui/material";

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';

import { likePost } from "../../../actions/posts";


const LikeButton = ({post}) => {
    const [likeMsg, setLikeMsg] = useState('')
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch();
    let user;

    useEffect(()=>{
        user = JSON.parse(localStorage.getItem('user'));
        if(user?.result._id) setDisabled(false)
        if(post?.likes?.indexOf(user?.result?._id || user?.result?.googleId) === -1){
            setLikeMsg('Like')
        }else{
            setLikeMsg('Unlike')
        }
    },[post])


    const likePostFunc = (event) => {
        event.stopPropagation()
        dispatch(likePost(post?._id))
    }
    
    if (!disabled) return (
    <Button size="small" color="primary" onClick={likePostFunc}>
        {
            
            (
            <>
                { 
                    likeMsg === 'Unlike' ? 
                    <ThumbUpAltIcon fontSize="small" /> :
                    <ThumbUpAltOutlined fontSize="small" />
                }
                &nbsp; 
                {post?.likes?.length}&nbsp;
                { likeMsg }
            </>
            )
        }
    </Button>
  )
};

export default LikeButton;
