import React from "react";

import { Grid } from "@material-ui/core";

import { useSelector } from "react-redux";

import PeopleOutline from '@material-ui/icons/PeopleOutline';

import Banner from "../userBanner/Banner/Banner";

import Friend from "./Friend/Friend";

import './index.css'

const Friends = ({bannerOrFriends, setBannerOrFriends}) => {

  const loggedUser = useSelector(state => state.user.loggedUser)
    
  return (
    <div style={{padding: '0 1rem', boxSizing:'border-box'}}>
      <Grid container>
        <Grid item style={{backgroundColor: bannerOrFriends === 'friends' ? '#fff' : '', width: bannerOrFriends === 'friends' ? 'fit-content' : '', height: bannerOrFriends === 'friends' ? '100vh' : '', overflowY: bannerOrFriends === 'friends' ? 'scroll' : ''}}  className="banner-or-friends-container" sm={5} md={3} >
            {
              bannerOrFriends === 'friends' ? (
                <>
                  <h3 style={{padding:'0rem 1rem'}}>{loggedUser?.friends?.length} Friends</h3>
                  <div style={{width:'100%'}}>
                      { 
                          loggedUser?.friends?.map((friend,i) => (
                            <div className="friend-button" onClick={()=>{setBannerOrFriends(friend)}}>
                              <div>
                                <img src={friend.picture} style={{height:'3rem', width:'3rem', borderRadius: '50%'}}/>
                              </div>
                              <div>
                                <h3>{friend.firstName} {friend.lastName}</h3>
                              </div>
                            </div>
                          ))
                      }
                  </div>
                </>
                ):(
                  <Banner user={bannerOrFriends} addFriendBtn={false} component={'friends'} setBannerOrFriends={setBannerOrFriends} style={{height:'100%'}} className={'two friends-banner-component'}  />
                )
             }
        </Grid>

        <Grid item xs={bannerOrFriends === 'friends' ? 5: 12} sm={7} md={9} style={{padding:'0 0.5rem'}}>
          {
            (bannerOrFriends === 'friends') ? (
              <div className="click-friends-banner">
                <PeopleOutline fontSize="large"  /> 
                <p>Select people's names to preview their profile.</p>
              </div>
            ) : (
              <div className="friends-posts">
                <Friend id={bannerOrFriends._id} bannerOrFriends={bannerOrFriends} />
              </div>
            )
          }
        </Grid>
      </Grid>
  </div>
  )
};

export default Friends;
