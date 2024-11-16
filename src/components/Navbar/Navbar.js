import React, { useEffect, useState, useRef, useContext } from "react";
import { navigate, useLocation } from '@reach/router'
import decode from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Toolbar, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Notifications from '@mui/icons-material/Notifications';
import SettingsApplications from '@mui/icons-material/SettingsApplications';
import PeopleOutline from '@mui/icons-material/PeopleOutline';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Home from '@mui/icons-material/Home';
import { CLEAR_STATE } from "../../constants/actionTypes";
import { getPostsPerPage } from "../../actions/posts";
import { getUserInfoByEmail } from "../../actions/users";
import UserRequest from "./UserRequests/UserRequest";
import memories from '../../assets/memories.png'
import './index.css'
import GlobalVariablesContext from "../../context/globalVariables";

 
const Navbar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navbarModalRef = useRef(null);
    const userClickRef = useRef(null)

    const user = useSelector(state => state.user.loggedUser);
    const { setSearchByQuery } = useContext(GlobalVariablesContext)

    const [friendRequestModal, setFriendRequestModal] = useState(false);
    const [openNavbarModal, setOpenNavbarModal] = useState(false);
    const [localStorageUser, setLocalStorageUser] = useState({})
    

    function useOutsideAlerter(refsArr) {
        useEffect(() => {
          function handleClickOutside(event) {
            if (refsArr[0].current && !refsArr[0].current.contains(event.target) && !refsArr[1].current.contains(event.target)) {
                    setOpenNavbarModal(false)
                    setFriendRequestModal(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [refsArr]);
      }
      useOutsideAlerter([navbarModalRef, userClickRef]);  
      
    
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
        navigate('/')
        setOpenNavbarModal(false)
    }

    const goToFriendsPage = () => {
        navigate('/friends/');
        setOpenNavbarModal(false)
    }

    const goToUserSettings = (id) => {
        navigate(`/user/${id}`)
        setOpenNavbarModal(false)
    }

    function logout() {
        localStorage.clear();
        dispatch({ type: 'LOGOUT'})
        dispatch({type: CLEAR_STATE})
        dispatch(getPostsPerPage(1))
        setFriendRequestModal(false);
        setOpenNavbarModal(false);
        navigate('/')
    }

    const navigateHome = ()=> { 
        navigate('/');
        setSearchByQuery('')
    }
    
  return (
    <Box className='appBar' sx={{backgroundColor: 'white'}}>
        <Box className='logo-container' onClick={navigateHome}>
            <Typography className='logo-heading'>Friends<span style={{color:'#ff6000'}}>Wall</span></Typography>
            <img className='logo-image' src={memories} alt='memories' />
        </Box>
        <Toolbar className='navbar-toolbar'>
            {
                Object.keys(localStorageUser).length > 0 ? (
                <Box sx={{display:'flex', justifyContent:'end', alignItems:'center', position:'relative'}}>
                    <Box sx={{display: 'flex', borderRadius: '8px', gap: '0.5rem', marginRight: '0.5rem'}}>      
                        <button 
                            className='notifications-button' 
                            onClick={()=>{ setFriendRequestModal((state) => !state); setOpenNavbarModal(false) }}
                        >
                            <span style={{borderRadius:'50%', backgroundColor:'red', width:'0.9rem', height:'0.9rem', position:'absolute', top:'-0.3rem', right:'-0.2rem', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>{user?.requests?.length}</span>
                            <PersonAdd fontSize="small"/>
                        </button>
                        {
                            friendRequestModal && (
                                <Box ref={navbarModalRef} sx={{position:'absolute', right:'0rem', top:'3.2rem', backgroundColor:'white', zIndex:'5', borderRadius:'18px', border:'1px solid black'}}>
                                    {
                                        user?.requests.map((requestor,i, array) => (
                                            <UserRequest requestor={requestor} last={i===array.length-1} />
                                        ))
                                    }
                                </Box>
                            )
                        }
                        <button className='notifications-button'><span style={{borderRadius:'50%', backgroundColor:'red', width:'0.9rem', height:'0.9rem', position:'absolute', top:'-0.3rem', right:'-0.2rem', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>0</span><Notifications fontSize='small'/></button>
                    </Box>
                    <Box 
                        sx={{width: '100%', cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'end'}} 
                        onClick={() => {setOpenNavbarModal((state) => !state); setFriendRequestModal(false)}}
                        ref={userClickRef}
                    >
                        <img src={user?.picture} className='navbar-user-pic' alt={user?.name} />
                        <ExpandMoreIcon />
                    </Box>
                    {
                        openNavbarModal && (
                                <Box className='navbar-modal' ref={navbarModalRef}>
                                    <Typography className='navbar-username'>
                                        {user?.firstName} {user?.lastName}
                                    </Typography>
                                    <Button sx={{display: 'flex', alignItems: 'center', gap: '10px'}} onClick={()=>{goToHome()}}><Home /> Home</Button>
                                    <Button sx={{display: 'flex', alignItems: 'center', gap: '10px'}} onClick={()=>{goToFriendsPage()}}><PeopleOutline /> Friends</Button>
                                    <Button sx={{display: 'flex', alignItems: 'center', gap: '10px'}} onClick={()=>{goToUserSettings(user?._id)}}><SettingsApplications />Profile Settings</Button>
                                    <Box sx={{display:'flex', justifyContent:'end'}}>
                                        <Button sx={{height:'1.6rem', width:'4.5rem', marginTop:'1rem'}}  variant="outlined" color="error" onClick={logout}>
                                            Logout
                                        </Button>
                                    </Box>
                                </Box>
                        )
                    }

                </Box>
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
