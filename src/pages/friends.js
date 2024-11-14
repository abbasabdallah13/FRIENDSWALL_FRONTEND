import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "../components/Friends/Friend/Friend";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import GlobalVariablesContext from '../context/globalVariables'
import { getFriendDetails } from "../actions/users";
import { Box, Button, Grid, Typography } from "@mui/material";
import PeopleOutline from '@mui/icons-material/PeopleOutline';

export default function Component () {

  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.user.loggedUser)
  const { scrollToTopButton, setScrollToTopButton } = useContext(GlobalVariablesContext)

  const [selectedFriend, setSelectedFriend] = useState(null)
  const [mobileVersion, setMobileVersion] = useState(false)


  function ChooseFriend(friend) {
    setSelectedFriend(friend._id);
    dispatch(getFriendDetails(friend._id));

  }

  function ChooseFriendMobile(friend)
  {
    setSelectedFriend(friend._id);
    setMobileVersion(true);
    dispatch(getFriendDetails(friend._id));
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 100){
        setScrollToTopButton(true);
      }else{
        setScrollToTopButton(false);
      }
    })
  }, [setScrollToTopButton]);
  
    
  return (
      <Grid container>
        <Grid item sx={{backgroundColor: '#fff', minHeight: '100vh', overflowY: 'scroll'}} xs={12} lg={3} >
            {
              !mobileVersion ? (
                <Box sx={{width:'100%', display: 'flex', flexDirection:'column'}}>
                  <Typography variant="body1" sx={{margin: '10px'}}>{loggedUser?.friends?.length} Friends</Typography>
                  <Box sx={{width:'100%', height: '100%'}}>
                      { 
                          loggedUser?.friends?.map((friend,i) => (
                            <Box key={`key-${i}`}>
                              <Box
                                sx={{display: {xs:'flex', lg: 'none'}, padding: '10px', width: '100%', gap:'5px', alignItems: 'center', cursor: 'pointer', '&:hover': {backgroundColor: '#E7E1D9'}, backgroundColor: `${friend._id === selectedFriend ? '#E7E1D9' : ''}`}} 
                                onClick={() => ChooseFriendMobile(friend)}
                                >
                                <Box>
                                  <img src={friend.picture} alt="friend display picture" style={{height:'3rem', width:'3rem', borderRadius: '50%'}}/>
                                </Box>
                                <Box>
                                  <h3>{friend.firstName} {friend.lastName}</h3>
                                </Box>
                              </Box>
                              <Box
                                sx={{padding: '10px', width: '100%', display: {xs:'none', lg: 'flex'}, gap:'5px', alignItems: 'center', cursor: 'pointer', '&:hover': {backgroundColor: '#E7E1D9'}, backgroundColor: `${friend._id === selectedFriend ? '#E7E1D9' : ''}`}} 
                                onClick={() => ChooseFriend(friend)}
                                >
                                <Box>
                                  <img src={friend.picture} alt="friend display picture" style={{height:'3rem', width:'3rem', borderRadius: '50%'}}/>
                                </Box>
                                <Box>
                                  <h3>{friend.firstName} {friend.lastName}</h3>
                                </Box>
                              </Box>
                            </Box>
                          ))
                      }
                  </Box>
                </Box>
                ) : (
                  <Box sx={{padding: '5px', height: '100%', width:'100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {
                      scrollToTopButton && (
                        <Box style={{position:'fixed', bottom:'0.5rem', right:'1rem', zIndex:'11'}} onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth' })}>
                          <ScrollToTop />
                        </Box>
                      )
                    }
                    <Button onClick={() => setMobileVersion(false)}>Back</Button>
                    <Box sx={{marginTop: '1rem', height: '100%', maxWidth: '100%'}}>
                      <Friend id={selectedFriend} />
                    </Box>
                  </Box>
                )
             }
        </Grid>
        <Grid item lg={9} sx={{padding: '.8rem', minHeight: '100vh', display: {xs: 'none', lg:'block'}, backgroundColor: `${!selectedFriend ? '#c8c8c8' : 'white'}`, position: 'relative'}} >
          {
            !selectedFriend ? (
              <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                <PeopleOutline fontSize="large" /> 
                <p>Select a friend's name to preview their profile.</p>
              </Box>
            ) : (
              <Friend id={selectedFriend} />
            )
          }
        </Grid>
      </Grid>
  )
};

