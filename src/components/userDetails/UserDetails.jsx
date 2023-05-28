import React, { useEffect, useState } from "react";

import bcrypt from 'bcryptjs';

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import FileBase from "react-file-base64"

import ReactCountryFlag from "react-country-flag"

import { Button, CircularProgress, Divider, TextField } from "@material-ui/core";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline.js"
import Cancel from "@material-ui/icons/Cancel.js"
import CameraAlt from "@material-ui/icons/CameraAlt.js"

import {  getUserInfo, updateUserInfoAction } from "../../actions/users.js";

import { getCountryFlag } from "../../utils/utils.js";

import CountrySelect from "../CountrySelect.jsx";
import Banner from "../userBanner/Banner/Banner.jsx";

import testBanner from "../../assets/testbanner.png";

import './index.css'

const UserDetails = () => {
  const { id } = useParams();
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

  return isLoading ?<div style={{width:'100%', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><CircularProgress /></div> : (
    <div className='oneStar'>
      {/* 1 */}
      <div className="one"> 
          {/* 2 */}
          <Banner user={user} userInfo={userInfo} addFriendBtn={false} className={'two user-banner-component'} />
          {/* 3 */}
          <div className='three'>
            {/* 4 */}
            <img className='four' src={testBanner} alt='profile banner' />
            {/* 5 */}
            <form className='five' onSubmit={updateUserInfo}>
                {/* 6 */}
                <div className="six">
                  {/* 7 */}
                  <div className="seven">
                  {
                      updatedBanner && (
                        <div style={{display:'flex', justifyContent:'space-between', backgroundColor:'#EDF6EA', height:'3rem', borderRadius: '8px'}}>
                          <p style={{padding:'0.3rem', display:'flex', alignItems:'center', color:'green'}}>
                            <CheckCircleOutlineIcon style={{fill:'green', marginLeft:'1rem'}} />
                            <span style={{marginLeft: '1rem'}}>{updatedBanner}</span>
                          </p>
                          <div style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'0.3rem'}}>
                            <Divider style={{marginRight: '0.5rem'}}  orientation="vertical" />
                            <Cancel style={{fill:'green', cursor: 'pointer', marginRight: '0.3rem'}} onClick={()=>setUpdatedBanner(false)}  fontSize="medium" />
                          </div>
                        </div>
                      )
                  }
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <div style={{display:'flex', flexDirection:'column', marginTop:'1rem'}}><label style={{fontWeight:'700'}}>First Name:</label><TextField  style={{marginTop:'0.3rem'}}  name="firstName" variant="outlined"  value={userInfo?.firstName || user?.firstName} onChange={(e) => userInfo ? setUserInfo({...userInfo, firstName: e.target.value}) : setUserInfo({...user, firstName: e.target.value})}/></div>
                    <div style={{display:'flex', flexDirection:'column', marginTop:'1rem'}}><label style={{fontWeight:'700'}}>Last Name:</label><TextField  fullWidth  style={{marginTop:'0.3rem'}}  name="lastName" variant="outlined"  value={userInfo?.lastName || user?.lastName} onChange={(e) => userInfo ? setUserInfo({...userInfo, lastName: e.target.value}) : setUserInfo({...user, lastName: e.target.value})}/></div>
                    <label style={{fontWeight:'700', marginTop:'1rem'}}>Email: <span style={{backgroundColor:'#e8e8e8', padding:'0.3rem'}}>{user?.email}</span></label>
                    <div style={{display:'flex', alignItems:'center', marginTop:'1rem'}}>
                      <label style={{fontWeight:'700'}}>Password:</label>
                      {
                        !changePasswordModal && (
                          <Button onClick={()=>setChangePasswordModal(true)}  variant="outlined" style={{marginLeft:'1rem', backgroundColor:'white', borderRadius:'7px', padding:'0.2rem 0.3rem'}} >{user.password === '%G%O%O%G%L%E%A%C%C%O%U%N%T%' ? 'Create a Password' : 'Change Password'}</Button>
                        )
                      }
                    </div>
                    {
                      changePasswordModal && (
                          <div style={{boxSizing:'border-box', backgroundColor: '#e0e0e0', padding:'1rem', borderRadius:'8px', position:'relative', display:'flex', flexDirection:'column', alignItems:'end', border:'1px solid black'}}>
                            {
                              user.password === '%G%O%O%G%L%E%A%C%C%O%U%N%T%' && (
                                <h4 style={{marginRight:'1rem'}}>Create a password for your account</h4>
                              )
                            } 
                            {
                              passwordErrorMessage.length > 0 && (
                                <div style={{width: '100%', display: 'flex', alignItems:'center'}}><div style={{marginLeft:'1rem'}}><Cancel style={{fill:'red'}} /></div><p style={{marginLeft:'1rem'}}>{passwordErrorMessage}</p></div>
                              )
                            }
                            {
                                user.password !== '%G%O%O%G%L%E%A%C%C%O%U%N%T%' && (
                                <div style={{position:'relative', display:'flex',flexDirection:'column',marginTop:'1rem', width:'100%'}}><label>Old Password:</label><TextField required  style={{marginLeft:'1rem'}}  type='password' name="oldPassword" variant="outlined" onChange={(e)=>{ setOldPassword(e.target.value)}}/></div>
                              )
                            }
                            <div style={{display:'flex',flexDirection:'column',marginTop:'1rem', width:'100%'}}><label>New Password:</label><TextField required  style={{marginLeft:'1rem'}}  type='password' name="newPassword" variant="outlined" onChange={(e)=>{setNewPassword(e.target.value)}}/></div>
                            <div style={{display:'flex',flexDirection:'column',marginTop:'1rem', width:'100%'}}><label>Confirm Password:</label><TextField required  style={{marginLeft:'1rem'}}  type='password' name="confirmPassword" variant="outlined" onChange={(e)=>{setConfirmPassword(e.target.value)}}/></div>
                            <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                              <Button style={{marginTop:'1rem', width: '45%', backgroundColor:passwordErrorMessage.length > 0 ? 'grey':'green', color: 'white'}} disabled={passwordErrorMessage.length > 0 || passwordErrorMessage === 'null'}  variant="outlined"  onClick={updatePassword}>Update Password</Button>
                              <Button style={{marginTop:'1rem', width: '45%', backgroundColor:'white'}}  variant="outlined"  onClick={()=> {setChangePasswordModal(false); setPasswordErrorMessage('Fields cannot be empty!')}}>Cancel</Button>
                            </div>
                          </div>
                      )
                    }
                    <div style={{display:'flex', alignItems:'center', marginTop:'1rem'}}>
                      <label>Country:</label>
                      <p style={{fontWeight:'700', marginLeft:'1rem'}}>
                        {userInfo?.country || user?.country}
                        <ReactCountryFlag 
                          countryCode={getCountryFlag(userInfo?.country ||user?.country)} 
                          svg
                          style={{height:'1.4rem', width:'1.4rem', marginLeft:'1rem'}}
                        />
                      </p>
                    </div>
                    <CountrySelect setUserInfo={setUserInfo} userInfo={userInfo} /></div>
                  </div> 
                  {/* 8 */}
                  <div className='eight'>
                    <div style={{position:'relative', display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <div className="profile-pic-change-container">
                          <img className='profile-pic-change' src={user?.picture} alt='profile picture' />  
                          <Button className='upload-pic-btn' style={{width:'3rem', height:'4rem', position:'absolute', bottom:'0', right:'2rem', borderRadius:'50%', display:'flex', justifyContent:'center', alignItems: 'center', backgroundColor:'white', padding:'0'}}> 
                            <CameraAlt fontSize='large' style={{position:'relative', left:'1rem'}} />
                            <FileBase type='file' multiple={false} onDone={({base64}) => setUserInfo({ ...userInfo, picture: base64})} />
                          </Button> 
                        </div>
                      </div>
                    <div style={{display:'flex', alignItems:'center', marginTop:'1rem', width:'100%'}}><TextField style={{width:'100%'}}  inputProps={{ maxLength: 50 }} name="bio" variant="outlined" label='Bio' value={userInfo?.bio || user?.bio} onChange={(e) => {setUserInfo({...userInfo, bio: e.target.value})}}/></div>
                  </div>
                </div>
              {/* 9 */}
              <div className='nine'> 
                <Button variant='contained' type='submit' disabled={!userInfoUpdated || changePasswordModal} style={{backgroundColor: !userInfoUpdated || changePasswordModal ? 'grey' :'green', color:'white'}}>Save</Button>
              </div>
            </form>
          </div>
      </div>
    </div>
    )
};

export default UserDetails;
