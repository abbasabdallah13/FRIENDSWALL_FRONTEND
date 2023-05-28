import React from "react";

import { useDispatch } from "react-redux";

import { Button } from "@material-ui/core";

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import { likePost } from "../../../actions/posts";


const LikeButton = ({post}) => {
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('user'));

    const likePost = (e,id) => {
        e.stopPropagation()
        dispatch(likePost(id))
    }
  return (
    <Button size="small" color="primary" disabled={!user?.result}  onClick={(e) => likePost(e,post?._id)}>
        {
            post?.likes?.find(userId => userId === (user?.result?.googleId || user?.result?._id))
            ? (
            <>
                <ThumbUpAltIcon fontSize="small" /> &nbsp; {post?.likes?.length} Unlike
            </>
            ) : (
            <>
                <ThumbUpAltOutlined fontSize='small' /> &nbsp; {post?.likes?.length} Like
            </>
            )
        }
    </Button>
  )
};

export default LikeButton;
