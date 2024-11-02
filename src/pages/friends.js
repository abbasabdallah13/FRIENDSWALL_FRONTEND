import React, { useContext } from "react";

import { Box, Grid, Typography } from "@mui/material";

import { useSelector } from "react-redux";

import PeopleOutline from '@mui/icons-material/PeopleOutline';

import Banner from "../components/userBanner/Banner/Banner";

import Friend from "../components/Friends/Friend/Friend";

import GlobalVariablesContext from '../context/globalVariables'

export default function Component () {

  const { bannerOrFriends, setBannerOrFriends } = useContext(GlobalVariablesContext)  
  const loggedUser = useSelector(state => state.user.loggedUser)
    
  return (
    <Box>
      <Grid container>
        <Grid item sx={{backgroundColor: bannerOrFriends === 'friends' ? '#fff' : '', width: bannerOrFriends === 'friends' ? 'fit-content' : '', height: bannerOrFriends === 'friends' ? '100vh' : '', overflowY: bannerOrFriends === 'friends' ? 'scroll' : ''}}  className="banner-or-friends-container" sm={5} md={3} >
            {
              bannerOrFriends === 'friends' ? (
                <Box sx={{width:'100%', display: 'flex', flexDirection:'column'}}>
                  <Typography variant="body1" sx={{margin: '10px'}}>{loggedUser?.friends?.length} Friends</Typography>
                  <Box sx={{width:'100%'}}>
                      { 
                          loggedUser?.friends?.map((friend,i) => (
                            <Box sx={{padding: '10px', width: '100%', display: 'flex', gap:'5px', alignItems: 'center', marginTop: '10px', cursor: 'pointer', '&:hover': {backgroundColor: '#E7E1D9'}}} onClick={()=>{setBannerOrFriends(friend)}}>
                              <Box>
                                <img src={friend.picture} style={{height:'3rem', width:'3rem', borderRadius: '50%'}}/>
                              </Box>
                              <Box>
                                <h3>{friend.firstName} {friend.lastName}</h3>
                              </Box>
                            </Box>
                          ))
                      }
                  </Box>
                </Box>
                ):(
                  <Banner user={bannerOrFriends} addFriendBtn={false} component={'friends'} setBannerOrFriends={setBannerOrFriends} sx={{height:'100%'}} className={'two friends-banner-component'}  />
                )
             }
        </Grid>
        <Grid item xs={bannerOrFriends === 'friends' ? 5: 12} sm={7} md={9} sx={{padding:'0 0.5rem'}}>
          {
            (bannerOrFriends === 'friends') ? (
              <Box className="click-friends-banner">
                <PeopleOutline fontSize="large"  /> 
                <p>Select people's names to preview their profile.</p>
              </Box>
            ) : (
              <Box className="friends-posts">
                <Friend id={bannerOrFriends._id} bannerOrFriends={bannerOrFriends} />
              </Box>
            )
          }
        </Grid>
      </Grid>
  </Box>
  )
};

