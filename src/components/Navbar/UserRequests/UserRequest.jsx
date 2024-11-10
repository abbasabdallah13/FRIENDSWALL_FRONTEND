import React from "react";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriendAction, declineFriendAction } from "../../../actions/users";

const UserRequest = ({requestor, last}) => {    
    const dispatch = useDispatch();
    
    const loggedUser = useSelector(state => state.user.loggedUser);

    const acceptFriendRequest = () => {
        dispatch(acceptFriendAction(requestor?._id, loggedUser));
    }

    const declineFriendRequest = () => {
        dispatch(declineFriendAction(requestor?._id, loggedUser))
    }

  return (
    <Box sx={{marginTop:'0rem', display:'flex', gap:'0.5rem', borderBottom: !last?'1px solid #e8e8e8':'0', padding:'0.5rem'}}>
        <Box sx={{padding:'0.3rem', display:'flex', alignItems:'center'}}>
            <img src={requestor.picture} style={{borderRadius:'50%', width:'4rem', height:'4rem'}} />
        </Box>
        <Box sx={{display:'flex', flexDirection:'column'}}>
            <h3>{requestor?.firstName} {requestor?.lastName}</h3>
            <Box sx={{display:'flex', gap:'0.5rem'}}>
                <Button sx={{backgroundColor: 'green', color:'white', height:'1.5rem'}} onClick={acceptFriendRequest}>Accept</Button>
                <Button sx={{backgroundColor: 'red', color:'white', height:'1.5rem'}} onClick={declineFriendRequest}>Decline</Button>
            </Box>
        </Box>
    </Box>
  )
};

export default UserRequest;
