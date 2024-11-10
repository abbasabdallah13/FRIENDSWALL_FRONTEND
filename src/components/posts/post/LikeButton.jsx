import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import { likePost } from "../../../actions/posts";


const LikeButton = ({post, likeMsg}) => {
    const dispatch = useDispatch();

    const likePostFunc = (e) => {
        e.stopPropagation()
        dispatch(likePost(post?._id))
    }
    
   return (
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
                    {post?.likes?.length}
                    &nbsp;
                    {likeMsg}
                </>
            )
        }
    </Button>
  )
};

export default LikeButton;
