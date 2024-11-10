import {Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import FriendPosts from "./FriendPosts";

const Friend = ({ id }) => {
 
  const { friendDetails } = useSelector(state => state.user)
  
  return ( 
          <Box sx={{display:'flex', flexDirection:'column', maxWidth: '100%', height: '100%', zIndex: '10', position: 'relative'}}>
            <Box sx={{display: 'flex', flexDirection: {xs: 'column', lg: 'row'}, alignItems: 'center', gap: '1rem', width: '100%'}}>
              <img style={{borderRadius: '50%'}} width={100} height={100} src={friendDetails?.picture} />
              <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: {xs: 'center', lg: 'start'}}}>
                  <Typography sx={{fontSize: {xs: '12px'}}}>Full name: {friendDetails?.firstName} {friendDetails?.lastName}</Typography>
                  <Typography sx={{fontSize: {xs: '12px'}}}>Email: {friendDetails?.email}</Typography>
                  <Typography sx={{fontSize: {xs: '12px'}}}>Country: {friendDetails?.country}</Typography>
                  <Typography sx={{fontSize: {xs: '12px'}}}>Bio: {friendDetails?.bio}</Typography>
              </Box>
            </Box>
            <Typography variant="h5" sx={{margin: '3rem 0 1rem 0', textDecoration: 'underline', fontSize: {xs: '16px'}}}>Posts</Typography>
            <FriendPosts friendId={id} />
          </Box>
  )
};

export default Friend;
