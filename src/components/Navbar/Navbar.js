import React, { useEffect, useState, useRef } from "react";

import { Link, useLocation, useNavigate } from 'react-router-dom'

import decode from 'jwt-decode';

import { useDispatch, useSelector } from "react-redux";

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Notifications from '@material-ui/icons/Notifications';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Home from '@material-ui/icons/Home';

import { CLEAR_FRIEND_STATE, CLEAR_STATE } from "../../constants/actionTypes";
import { getPostsPerPage } from "../../actions/posts";

import UserRequest from "./UserRequests/UserRequest";

import memories from '../../assets/memories.png'

import './index.css'

 
const Navbar = ({setBannerOrFriends}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const navbarModalRef = useRef(null);

    const user = useSelector(state => state.user.loggedUser);

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
        console.log(user);
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
    }else{
        setLocalStorageUser({})
    }
        
    }, [location]);
    
    const goToHome = () => {
        navigate('/posts')
        setOpenNavbarModal(false)
        dispatch({type: CLEAR_FRIEND_STATE})
        setBannerOrFriends('friends');
    }

    const goToProfile = () => {
        navigate('/friends');
        setOpenNavbarModal(false)
        dispatch({type: CLEAR_FRIEND_STATE})
        setBannerOrFriends(user);
    }

    const goToFriendsPage = () => {
        navigate('/friends');
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
    
  return (
    <AppBar className='appBar' position="static" color="inherit">
        <div className='logo-container' onClick={()=>{ dispatch({type: CLEAR_FRIEND_STATE}); setBannerOrFriends('friends');navigate('/')}}>
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
                        <img src={user?.picture} className='navbar-user-pic' alt={user.name} />
                        <ExpandMoreIcon />
                    </div>
                    {
                        openNavbarModal && (
                            <>
                                <div className='navbar-modal' ref={navbarModalRef}>
                                    <Typography className='navbar-username'>
                                        {user?.firstName} {user?.lastName}
                                    </Typography>
                                    <Button className="navbar-button" onClick={()=>{goToHome()}}><span className="navbar-button-span"><Home /></span> Home</Button>
                                    <Button className="navbar-button" onClick={()=>{goToProfile()}}><span className="navbar-button-span"><AccountCircle /></span> Profile</Button>
                                    <Button className="navbar-button" onClick={()=>{goToFriendsPage()}}><span className="navbar-button-span"><PeopleOutline /></span> Friends</Button>
                                    <Button className="navbar-button" onClick={()=>{goToUserSettings(user?._id)}}><span className="navbar-button-span"><SettingsApplications /></span> Account Settings</Button>
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
                <Button className="sign-in-btn" component={Link} to='/auth' variant='contained' color='primary'>
                    Sign in
                </Button>
            )}
        </Toolbar>
    </AppBar>
  )
};

export default Navbar;
