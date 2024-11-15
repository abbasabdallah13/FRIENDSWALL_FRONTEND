import React, { useEffect, useState } from "react";

import bcrypt from 'bcryptjs';

import { useDispatch, useSelector } from "react-redux";

import { useLocation } from "@reach/router";

import FileBase from "react-file-base64"

import ReactCountryFlag from "react-country-flag"

import { Box, Button, Divider, TextField } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline.js"
import Cancel from "@mui/icons-material/Cancel.js"
import CameraAlt from "@mui/icons-material/CameraAlt.js"

import {  getUserInfo, updateUserInfoAction } from "../../actions/users.js";

import { getCountryFlag } from "../../utils/utils.js";

import CountrySelect from "../../components/CountrySelect.jsx";
import Banner from "../../components/userBanner/Banner/Banner.jsx";

import testBanner from "../../assets/testbanner.png";
import Spinner from "../../components/Spinner.jsx";
import { Helmet } from "react-helmet";


export default function Component() {

  const location = useLocation();
  const dispatch = useDispatch()
  
 

  let user = useSelector( state => state.user.loggedUser )
  const { isLoading } = useSelector ( state => state.posts )
  
  const [userInfo, setUserInfo] = useState({});
  const [userInfoUpdated, setUserInfoUpdated] = useState(false);
  const [updatedBanner, setUpdatedBanner] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('Fields cannot be empty!');
  
  let regex= /\/user\//
  let regex2= /\//
  const id = location.pathname.replace(regex,'').replace(regex2,''); 
  

  useEffect(() => {
    const obj1Props = Object.keys(user);
    const obj2Props = Object.keys(userInfo);
    for(let i=0;i<obj1Props.length;i++){
      let propName = obj1Props[i];
      if(propName !== 'password'){
        if(userInfo[propName] !== user[propName]){
          setUserInfoUpdated(true);
            break;
          }else{
            setUserInfoUpdated(false)
          }
        }
      }
      
  }, [userInfo]);
 
  useEffect(() => {
    setUserInfo({})
    dispatch(getUserInfo(id))
    setUserInfo(user)
  }, [id]);

  useEffect(() => {
    const passwordValidator = async() => {
      if(oldPassword.length > 0 && newPassword.length > 0 && confirmPassword.length > 0 || changePasswordModal && newPassword.length > 0 && confirmPassword.length > 0 ){
        let bool;
        if(user.password !== '%G%O%O%G%L%E%A%C%C%O%U%N%T%'){
          bool = await bcrypt.compare(oldPassword, user.password);
          if(!bool) {setPasswordErrorMessage('Incorrect Old Password')}
        }
        if(newPassword.length < 5) {setPasswordErrorMessage('New Password Should Be At Least 6 Characters Long')}
        if(newPassword !== confirmPassword) {setPasswordErrorMessage('Passwords Do Not Match')}
        if((bool && newPassword.length > 5 && newPassword === confirmPassword) || (user.password === '%G%O%O%G%L%E%A%C%C%O%U%N%T%' && newPassword.length > 5 && newPassword === confirmPassword)){
          setPasswordErrorMessage('');
          setUserInfo({...user, password: newPassword})
        }
     }else{
      setPasswordErrorMessage('Fields cannot be empty!')
     }
    }
    passwordValidator();

  }, [oldPassword, newPassword, confirmPassword]);
  
 
  const updatePassword = async() => {
    if(passwordErrorMessage.length === 0){
      dispatch(updateUserInfoAction(id, userInfo))
      setPasswordErrorMessage('');
      setChangePasswordModal(false);
      setUpdatedBanner('Password changed successfully!')
      window.location.reload();
    }
  }
  
  const updateUserInfo = async(event) => {
    event.preventDefault();
    setUpdatedBanner('Successfully Updated!')
    setUserInfoUpdated(false)
    dispatch(updateUserInfoAction(id, userInfo))
  }

  return (
    <>
      <Helmet>
        <title>FriendWall - Profile Settings</title>
      </Helmet>
      <main>
        {
          isLoading ? (
              <Box sx={{width:'100%', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Spinner />
              </Box> ) : (
            <Box className='oneStar'>
              {/* 1 */}
              <Box className="one"> 
                  {/* 2 */}
                  <Banner user={user} userInfo={userInfo} addFriendBtn={false} className={'two user-banner-component'} />
                  {/* 3 */}
                  <Box className='three'>
                    {/* 4 */}
                    <img className='four' src={testBanner} alt='profile banner' />
                    {/* 5 */}
                    <form className='five' onSubmit={updateUserInfo}>
                        {/* 6 */}
                        <Box className="six">
                          {/* 7 */}
                          <Box className="seven">
                          {
                              updatedBanner && (
                                <Box sx={{display:'flex', justifyContent:'space-between', backgroundColor:'#EDF6EA', height:'3rem', borderRadius: '8px'}}>
                                  <p style={{padding:'0.3rem', display:'flex', alignItems:'center', color:'green'}}>
                                    <CheckCircleOutlineIcon style={{fill:'green', marginLeft:'1rem'}} />
                                    <span style={{marginLeft: '1rem'}}>{updatedBanner}</span>
                                  </p>
                                  <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', padding:'0.3rem'}}>
                                    <Divider sx={{marginRight: '0.5rem'}} orientation="vertical" />
                                    <Cancel style={{fill:'green', cursor: 'pointer', marginRight: '0.3rem'}} onClick={()=>setUpdatedBanner(false)}  fontSize="medium" />
                                  </Box>
                                </Box>
                              )
                          }
                          <Box sx={{display:'flex', flexDirection:'column'}}>
                            <Box sx={{display:'flex', flexDirection:'column', marginTop:'1rem'}}><label style={{fontWeight:'700'}}>First Name:</label><TextField  style={{marginTop:'0.3rem'}}  name="firstName" variant="outlined"  value={userInfo?.firstName || user?.firstName} onChange={(e) => userInfo ? setUserInfo({...userInfo, firstName: e.target.value}) : setUserInfo({...user, firstName: e.target.value})}/></Box>
                            <Box sx={{display:'flex', flexDirection:'column', marginTop:'1rem'}}><label style={{fontWeight:'700'}}>Last Name:</label><TextField  fullWidth  style={{marginTop:'0.3rem'}}  name="lastName" variant="outlined"  value={userInfo?.lastName || user?.lastName} onChange={(e) => userInfo ? setUserInfo({...userInfo, lastName: e.target.value}) : setUserInfo({...user, lastName: e.target.value})}/></Box>
                            <label style={{fontWeight:'700', marginTop:'1rem'}}>Email: <span style={{backgroundColor:'#e8e8e8', padding:'0.3rem'}}>{user?.email}</span></label>
                            <Box sx={{display:'flex', alignItems:'center', marginTop:'1rem'}}>
                              <label style={{fontWeight:'700'}}>Password:</label>
                              {
                                !changePasswordModal && (
                                  <Button onClick={()=>setChangePasswordModal(true)}  variant="outlined" style={{marginLeft:'1rem', backgroundColor:'white', borderRadius:'7px', padding:'0.2rem 0.3rem'}} >{user.password === '%G%O%O%G%L%E%A%C%C%O%U%N%T%' ? 'Create a Password' : 'Change Password'}</Button>
                                )
                              }
                            </Box>
                            {
                              changePasswordModal && (
                                  <Box sx={{boxSizing:'border-box', backgroundColor: '#e0e0e0', padding:'1rem', borderRadius:'8px', position:'relative', display:'flex', flexDirection:'column', alignItems:'end', border:'1px solid black'}}>
                                    {
                                      user.password === '%G%O%O%G%L%E%A%C%C%O%U%N%T%' && (
                                        <h4 style={{marginRight:'1rem'}}>Create a password for your account</h4>
                                      )
                                    } 
                                    {
                                      passwordErrorMessage.length > 0 && (
                                        <Box sx={{width: '100%', display: 'flex', alignItems:'center'}}><Box sx={{marginLeft:'1rem'}}><Cancel style={{fill:'red'}} /></Box><p style={{marginLeft:'1rem'}}>{passwordErrorMessage}</p></Box>
                                      )
                                    }
                                    {
                                        user.password !== '%G%O%O%G%L%E%A%C%C%O%U%N%T%' && (
                                        <Box sx={{position:'relative', display:'flex',flexDirection:'column',marginTop:'1rem', width:'100%'}}><label>Old Password:</label><TextField required  style={{marginLeft:'1rem'}}  type='password' name="oldPassword" variant="outlined" onChange={(e)=>{ setOldPassword(e.target.value)}}/></Box>
                                      )
                                    }
                                    <Box sx={{display:'flex',flexDirection:'column',marginTop:'1rem', width:'100%'}}><label>New Password:</label><TextField required  style={{marginLeft:'1rem'}}  type='password' name="newPassword" variant="outlined" onChange={(e)=>{setNewPassword(e.target.value)}}/></Box>
                                    <Box sx={{display:'flex',flexDirection:'column',marginTop:'1rem', width:'100%'}}><label>Confirm Password:</label><TextField required  style={{marginLeft:'1rem'}}  type='password' name="confirmPassword" variant="outlined" onChange={(e)=>{setConfirmPassword(e.target.value)}}/></Box>
                                    <Box sx={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                                      <Button style={{marginTop:'1rem', width: '45%', backgroundColor:passwordErrorMessage.length > 0 ? 'grey':'green', color: 'white'}} disabled={passwordErrorMessage.length > 0 || passwordErrorMessage === 'null'}  variant="outlined"  onClick={updatePassword}>Update Password</Button>
                                      <Button style={{marginTop:'1rem', width: '45%', backgroundColor:'white'}}  variant="outlined"  onClick={()=> {setChangePasswordModal(false); setPasswordErrorMessage('Fields cannot be empty!')}}>Cancel</Button>
                                    </Box>
                                  </Box>
                              )
                            }
                            <Box sx={{display:'flex', alignItems:'center', marginTop:'1rem'}}>
                              <label>Country:</label>
                              <p style={{fontWeight:'700', marginLeft:'1rem'}}>
                                {userInfo?.country || user?.country}
                                <ReactCountryFlag 
                                  countryCode={getCountryFlag(userInfo?.country ||user?.country)} 
                                  svg
                                  style={{height:'1.4rem', width:'1.4rem', marginLeft:'1rem'}}
                                />
                              </p>
                            </Box>
                            <CountrySelect setUserInfo={setUserInfo} userInfo={userInfo} /></Box>
                          </Box> 
                          {/* 8 */}
                          <Box className='eight'>
                            <Box sx={{position:'relative', display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <Box className="profile-pic-change-container">
                                  <img className='profile-pic-change' src={user?.picture} alt='profile picture' />  
                                  <Button className='upload-pic-btn' style={{width:'3rem', height:'4rem', position:'absolute', bottom:'0', right:'2rem', borderRadius:'50%', display:'flex', justifyContent:'center', alignItems: 'center', backgroundColor:'white', padding:'0'}}> 
                                    <CameraAlt fontSize='large' style={{position:'relative', left:'1rem'}} />
                                    <FileBase type='file' multiple={false} onDone={({base64}) => setUserInfo({ ...userInfo, picture: base64})} />
                                  </Button> 
                                </Box>
                              </Box>
                            <Box sx={{display:'flex', alignItems:'center', marginTop:'1rem', width:'100%'}}><TextField style={{width:'100%'}}  inputProps={{ maxLength: 50 }} name="bio" variant="outlined" label='Bio' value={userInfo?.bio || user?.bio} onChange={(e) => {setUserInfo({...userInfo, bio: e.target.value})}}/></Box>
                          </Box>
                        </Box>
                      {/* 9 */}
                      <Box className='nine'> 
                        <Button variant='contained' type='submit' disabled={!userInfoUpdated || changePasswordModal} style={{backgroundColor: !userInfoUpdated || changePasswordModal ? 'grey' :'green', color:'white'}}>Save</Button>
                      </Box>
                    </form>
                  </Box>
              </Box>
            </Box>
              )
        }
      </main>
    </>
  )
};

