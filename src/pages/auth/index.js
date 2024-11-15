import React, {useEffect, useState} from "react";

import { Avatar, Button, Paper, Grid, Typography, Box } from '@mui/material' 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { GoogleLogin } from '@react-oauth/google';

import { useDispatch, useSelector } from "react-redux";

import { navigate } from '@reach/router'

import { googleSignInAction, signIn, signUp } from '../../actions/auth'
import Icon from '../../assets/icon'
import Input from '../../components/Input'
import { createOrGetUser } from "../../utils/utils";
import CountrySelect from "../../components/CountrySelect"
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet";

export default function Index() {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: ''
    }

    
    useEffect(()=>{
        let localStorageUser = JSON.parse(localStorage.getItem('user'));
    },[])

    const dispatch = useDispatch()

    const {loginError, registerError} = useSelector(state => state.auth)
    

    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(signUp(formData, navigate))
        }else{
            dispatch(signIn(setLoading, formData, navigate))            
        }
    }    

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword( prev => !prev)
    }

    const switchMode = () => {
        setIsSignUp(prev => !prev)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const decoded = createOrGetUser(res);
        const { family_name, given_name, picture , email } = await decoded;
        try {
            dispatch(googleSignInAction({ googleResponseObject: {family_name, given_name, picture , email } }, navigate))
        } catch (error) {
            console.log(error)
        }
        
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log('google sign in was unsuccessful. try again later.')
    }

 
  
  return (
    <>
        <Helmet>
            <title>FriendsWall - Login </title>
        </Helmet>
        <main>
            <Box display={'flex'} justifyContent={'center'} sx={{minHeight: '80vh'}}>
                <Paper sx={{marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: {xs:'3rem', lg:'3rem 5rem'}}} elevation={3}>
                    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        {
                            loading ? (
                                <Spinner />
                                ) : (
                                <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Avatar sx={{margin: '5px'}}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                                    {
                                        isSignUp ? 
                                        <p style={{color: 'red', fontFamily: 'monospace', textTransform: 'lowercase', textAlign: 'left'}}>{registerError}</p> :
                                        <p style={{color: 'red', fontFamily: 'monospace', textTransform: 'lowercase', textAlign: 'left'}}>{loginError}</p>
                                    }
                                    <form onSubmit={handleSubmit}>
                                        <Box>
                                            {
                                                isSignUp && (
                                                    <>
                                                        <Input name='firstName' label='First Name' handleChange={handleChange}  />
                                                        <Input name='lastName' label='Last Name' handleChange={handleChange} />
                                                        <CountrySelect style={{height:'3rem', margin:'0.5rem 0', padding:'0 0.5rem'}}  userInfo={formData} setUserInfo={setFormData}  />
                                                    </>
                                                )
                                            }
                                            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                                            <Input name='password' label='Password' handleChange={handleChange} type= { showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                                            { 
                                                isSignUp && (
                                                    <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> 
                                                )
                                            } 
                                        </Box>
                                        <Button
                                            type='submit'
                                            fullWidth
                                            variant='contained'
                                            color='primary'
                                            sx={{margin: '10px 5px 5px'}}
                                        >
                                            { 
                                                isSignUp ? 'Sign Up' : 'Sign In'
                                            }
                                        </Button>
                                        <Box sx={{display:'flex', justifyContent:'center'}}>
                                            <GoogleLogin 
                                                render={(renderProps) => (
                                                    <Button 
                                                        sx={{marginBottom: '5px'}}
                                                        color='primary' 
                                                        fullWidth 
                                                        onClick={renderProps.onClick} 
                                                        disabled={renderProps.disabled} 
                                                        startIcon={<Icon />} 
                                                        variant='contained'
                                                        >
                                                            Google Sign In
                                                        </Button>
                                                )}
                                                onSuccess={googleSuccess}
                                                onError={googleFailure}
                                                cookiePolicy="single_host_origin"
                                            />
                                        </Box>
                                        <Grid container justifyContent='center'>
                                            <Grid item>
                                                <Button sx={{marginTop:'1rem', backgroundColor:'#e8e8e8', color:'black', '&:hover': {color: 'white'}, fontSize: '10px'}} variant="contained" onClick={switchMode}>
                                                    {
                                                        isSignUp ? 'Already have an account ? Sign In' : "Don't have an account ? Sign Up"
                                                    }
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>       
                                </Box>
                            )
                        }
                    </Box>
                </Paper>
            </Box>
        </main>
    </>
    )
  }
