import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactCountryFlag from "react-country-flag"
import { Button, Divider, Zoom } from "@mui/material"
import PersonAdd from '@mui/icons-material/PersonAdd'
import { addFriendAction, unfriendAction, unsendFriendRequest } from "../../../actions/users";
import { getCountryFlag } from "../../../utils/utils";

const Banner = ({user, userInfo, addFriendBtn, style, className}) => {
    const loggedUser = useSelector(state => state.user.loggedUser);
    const [localStorageUser, setLocalStorageUser] = useState(null)

    useEffect(() => {
      let lcUser = JSON.parse(localStorage.getItem('user'));  
      setLocalStorageUser(lcUser);
    }, [])
    
    

    const dispatch = useDispatch();

    const [bannerButton, setBannerButton] = useState('');
    const [bannerModal, setBannerModal] = useState(false);
    const [unfriendModal, setUnfriendModal] = useState(false);
    const anywhereClick = useRef(null);
    
    const friendActions = (userId) => {
      if(bannerButton === 'Add Friend'){
        dispatch(addFriendAction(userId, loggedUser));
        setBannerButton('Request Sent');
      }else if(bannerButton === 'Request Sent'){
        dispatch(unsendFriendRequest(userId, loggedUser._id));
        setBannerButton('Add Friend');
      }
    }

    useEffect(() => {
        if(addFriendBtn){
          const friends = user?.friends?.map(friend => friend._id);
          const ids = user?.requests?.map(request => request._id);
          if(friends?.indexOf(loggedUser?._id) === -1){ //they are not friends
            setBannerButton('Add Friend');
          }
          if(friends?.indexOf(loggedUser?._id) !== -1){ //they are friends
            setBannerButton('Friends')
          }
          if(ids?.indexOf(loggedUser?._id) !== -1) { //friend request is not sent 
            setBannerButton('Request Sent');
          }
        }
    }, [addFriendBtn, loggedUser?._id, user?.friends, user?.requests]);

    const unfriendUser = () => {
      dispatch(unfriendAction(user?._id, loggedUser?._id));
    }

    function useOutsideClicker(ref) {
      useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
             setBannerModal(false)
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    }
    useOutsideClicker(anywhereClick);
    
    
  return (
    <Zoom in >
      <div style={{position:'relative', width: style?.width, height: style?.height, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}  className={className} >
        {
          unfriendModal && (
            <div style={{position:'absolute', top:'0',left:'0', width:'100%', height:'100%', backgroundColor:'rgb(255,255,255,0.95)', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', zIndex:'88'}}>
              <p style={{textAlign:'center'}}>Are you sure you want to unfriend {user?.firstName} {user?.lastName} ?</p>
              <div style={{display:'flex', gap:'1rem'}}>
                <Button style={{backgroundColor:'red', color:'white'}} onClick={unfriendUser}>Yes</Button>
                <Button style={{backgroundColor:'#e8e8e8'}}  onClick={()=>setUnfriendModal(false)}>Cancel</Button>
              </div>
            </div>
          )
        }
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
          <img style={{width:'10rem', height:'10rem', borderRadius:'50%'}}  src={userInfo?.picture || user?.picture} alt='profile pic' />
          <h3 className='banner-name'>{userInfo?.firstName || user?.firstName} {userInfo?.lastName || user?.lastName}</h3>
          <p className='bio'>{userInfo?.bio || user?.bio}</p>
        </div>
        <div>
          <p style={{color:'#8A8A8A'}}>From</p>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', bottom:'1.5rem'}}>
            <p>{userInfo?.country || user?.country}</p>
            <ReactCountryFlag 
              countryCode={getCountryFlag(user?.country)} 
              svg
              style={{height:'1.4rem', width:'1.4rem'}}
            />
          </div>
          <Divider style={{position:'relative', bottom:"1.5rem"}} />
          <p style={{color:'#8A8A8A', position:'relative', bottom:"1.5rem"}}>Friends</p>
          <p style={{position:'relative', bottom:"1.5rem"}}>{user?.friends?.length}</p>
       </div>
      {
        addFriendBtn && (
          <div style={{display:'flex', justifyContent: 'end', alignItems: 'center',borderRadius: '8px', padding: '0.3rem'}}>
                <Button
                  disabled={!localStorageUser} 
                  style={{display:'flex', alignItems:'center', backgroundColor: !user ? 'grey' : ''}} 
                  variant='outlined'
                  onClick={()=>{friendActions(user?._id)}} 
                > 
                  {
                    bannerButton !== 'Friends' && (
                      <PersonAdd style={{marginRight: '0.4rem'}}/> 
                    )
                  } 
                  <span>{bannerButton}</span>
                </Button>
          </div>
        )
      }
      </div> 
    </Zoom>
  )
};

export default Banner;
