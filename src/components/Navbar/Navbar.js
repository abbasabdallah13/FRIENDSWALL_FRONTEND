import React, { useEffect, useState, useRef, useContext } from "react";

import { navigate, useLocation } from '@reach/router'

import decode from 'jwt-decode';

import { useDispatch, useSelector } from "react-redux";

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Notifications from '@mui/icons-material/Notifications';
import SettingsApplications from '@mui/icons-material/SettingsApplications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PeopleOutline from '@mui/icons-material/PeopleOutline';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Home from '@mui/icons-material/Home';

import { CLEAR_FRIEND_STATE, CLEAR_STATE } from "../../constants/actionTypes";
import { getPostsPerPage } from "../../actions/posts";
import { getUserInfo, getUserInfoByEmail } from "../../actions/users";

import UserRequest from "./UserRequests/UserRequest";

import memories from '../../assets/memories.png'

import './index.css'
import GlobalVariablesContext from "../../context/globalVariables"

 
const Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navbarModalRef = useRef(null);

    const user = useSelector(state => state.user.loggedUser);
    const { setBannerOrFriends } = useContext(GlobalVariablesContext)

    const [friendRequestModal, setFriendRequestModal] = useState(false);
    const [openNavbarModal, setOpenNavbarModal] = useState(false);
    const [localStorageUser, setLocalStorageUser] = useState({})


    function useOutsideAlerter(ref) {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                    setOpenNavbarModal(false)
                    setFriendRequestModal(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }
      useOutsideAlerter(navbarModalRef);    
    
    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('user'))?.token;
        if(token){
            try {
                const decodedToken = decode(token);
                if(decodedToken.exp * 1000 < new Date().getTime()) logout()
            } catch (error) {
                console.log(error.message)
            }
        }

    if(localStorage.getItem('user')){
        setLocalStorageUser(JSON.parse(localStorage.getItem('user'))?.result)
        dispatch(getUserInfoByEmail({email: JSON.parse(localStorage.getItem('user'))?.result.email}))
    }else{
        setLocalStorageUser({})
    }
        
    }, [location]);
    
    const goToHome = () => {
        navigate('/posts/')
        setOpenNavbarModal(false)
        dispatch({type: CLEAR_FRIEND_STATE})
        setBannerOrFriends('friends');
    }

    const goToProfile = () => {
        navigate('/friends/');
        setOpenNavbarModal(false)
        dispatch({type: CLEAR_FRIEND_STATE})
        setBannerOrFriends(user);
    }

    const goToFriendsPage = () => {
        navigate('/friends/');
        setOpenNavbarModal(false)
        dispatch({type: CLEAR_FRIEND_STATE})
        setBannerOrFriends('friends');
    }

    const goToUserSettings = (id) => {
        navigate(`/user/${id}`)
        setOpenNavbarModal(false)
        dispatch({type: CLEAR_FRIEND_STATE})
        setBannerOrFriends('friends');
    }

    const logout = () => {
        dispatch({ type: 'LOGOUT'})
        dispatch({type: CLEAR_STATE})
        dispatch(getPostsPerPage(1))
        setFriendRequestModal(false);
        setOpenNavbarModal(false);
        navigate('/')
    }

    const navigateHome = ()=> { 
        dispatch({type: CLEAR_FRIEND_STATE}); 
        setBannerOrFriends('friends');
        navigate('/');
        window.location.reload();
    }
    
  return (
    <Box className='appBar' sx={{backgroundColor: 'white'}}>
        <div className='logo-container' onClick={navigateHome}>
            <Typography  className='logo-heading'>Friends<span style={{color:'#ff6000'}}>Wall</span></Typography>
            <img className='logo-image' src={memories} alt='memories' />
        </div>
        <Toolbar className='navbar-toolbar'>
            {
                Object.keys(localStorageUser).length > 0 ? (
                <div style={{display:'flex', justifyContent:'end', alignItems:'center', position:'relative'}}>
                    <div style={{display: 'flex', borderRadius: '8px', gap: '0.5rem', marginRight: '0.5rem'}}>      
                        <button 
                            className='notifications-button' 
                            onClick={()=>{ setFriendRequestModal((state) => !state); setOpenNavbarModal(false) }}
                        >
                            <span style={{borderRadius:'50%', backgroundColor:'red', width:'0.9rem', height:'0.9rem', position:'absolute', top:'-0.3rem', right:'-0.2rem', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>{user?.requests?.length}</span>
                            <PersonAdd fontSize="small"/>
                        </button>
                        {
                            friendRequestModal && (
                                <div ref={navbarModalRef} style={{position:'absolute', right:'0rem', top:'3.2rem', backgroundColor:'white', zIndex:'5', borderRadius:'18px', border:'1px solid black'}}>
                                    {
                                        user?.requests.map((requestor,i, array) => (
                                            <UserRequest requestor={requestor} last={i===array.length-1} />
                                        ))
                                    }
                                </div>
                            )
                        }
                        <button className='notifications-button'><span style={{borderRadius:'50%', backgroundColor:'red', width:'0.9rem', height:'0.9rem', position:'absolute', top:'-0.3rem', right:'-0.2rem', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>0</span><Notifications fontSize='small'/></button>
                    </div>
                    <div 
                        style={{width: '100%', cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'end'}} 
                        onClick={() => {setOpenNavbarModal(true)}}
                    >
                        <img src={user?.picture} className='navbar-user-pic' alt={user?.name} />
                        <ExpandMoreIcon />
                    </div>
                    {
                        openNavbarModal && (
                            <>
                                <div className='navbar-modal' ref={navbarModalRef}>
                                    <Typography className='navbar-username'>
                                        {user?.firstName} {user?.lastName}
                                    </Typography>
                                    <Button className="navbar-button" onClick={()=>{goToHome()}}><Home /> <p style={{width: '95%'}}>Home</p></Button>
                                    <Button className="navbar-button" onClick={()=>{goToProfile()}}><AccountCircle /> <p style={{width: '95%'}}>Profile</p></Button>
                                    <Button className="navbar-button" onClick={()=>{goToFriendsPage()}}><PeopleOutline /> <p style={{width: '95%'}}>Friends</p></Button>
                                    <Button className="navbar-button" onClick={()=>{goToUserSettings(user?._id)}}><SettingsApplications /><p style={{width: '95%'}}>Account Settings</p></Button>
                                    <div style={{display:'flex', justifyContent:'end'}}>
                                        <Button style={{height:'1.6rem', width:'4.5rem', marginTop:'1rem'}}  variant="contained" color='secondary' onClick={logout}>
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )
                    }

                </div>
            ) : (
                <Button className="sign-in-btn" onClick={() => navigate('/auth/')} variant='contained' color='primary'>
                    Sign in
                </Button>
            )}
        </Toolbar>
    </Box>
  )
};

export default Navbar;
