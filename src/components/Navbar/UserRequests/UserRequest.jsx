import React from "react";

import { Button } from "@material-ui/core";

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
    <div style={{marginTop:'0rem', display:'flex', gap:'0.5rem', borderBottom: !last?'1px solid #e8e8e8':'0', padding:'0.5rem'}}>
        <div style={{padding:'0.3rem', display:'flex', alignItems:'center'}}>
            <img src={requestor.picture} style={{borderRadius:'50%', width:'4rem', height:'4rem'}} />
        </div>
        <div style={{display:'flex', flexDirection:'column'}}>
            <h3>{requestor?.firstName} {requestor?.lastName}</h3>
            <div style={{display:'flex', gap:'0.5rem'}}>
                <Button style={{backgroundColor: 'green', color:'white', height:'1.5rem'}} onClick={acceptFriendRequest}>Accept</Button>
                <Button style={{backgroundColor: 'red', color:'white', height:'1.5rem'}} onClick={declineFriendRequest}>Decline</Button>
            </div>
        </div>
    </div>
  )
};

export default UserRequest;
