import React, {useEffect, useState} from "react";

import { Avatar, Button, Paper, Grid, Typography, Container, CircularProgress } from '@material-ui/core' 
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { GoogleLogin } from '@react-oauth/google';

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { googleSignInAction, signIn, signUp } from '../../actions/auth'
import Icon from './icon'
import useStyles from './styles'
import Input from './Input'
import { createOrGetUser } from "../../utils/utils";
import CountrySelect from "../CountrySelect.jsx"

const Auth = () => {
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: ''
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const error = JSON.parse(localStorage.getItem('error'));

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const classes = useStyles();

    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        if(isSignUp){
            dispatch(signUp(formData, navigate))
        }else{
            dispatch(signIn(formData, navigate))            
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
        const { family_name, given_name, picture , email, sub } = await decoded;
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

    useEffect(() => {
     if(user) navigate('/');
     if(error) setLoading(false);
    }, []);   
  
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            {
                loading ? (
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <CircularProgress />
                    </div> 
                    ) : (
                    <>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography variant='h5'>{ isSignUp ? 'Sign Up' : 'Sign In' }</Typography>
                        {
                            error && (
                                 <p>{ error }</p>
                            )
                        }
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid style={{display:'flex', flexDirection:'column'}} spacing={2}>
                                {
                                    isSignUp && (
                                        <>
                                            <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus  />
                                            <Input name='lastName' label='Last Name' handleChange={handleChange} autoFocus  />
                                            <CountrySelect style={{height:'3rem', margin:'0.5rem 0', padding:'0 0.5rem'}}  userInfo={formData} setUserInfo={setFormData}  />
                                        </>
                                    )
                                }
                                <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                                <Input style={{marginTop:'1rem'}}  name='password' label='Password' handleChange={handleChange} type= { showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                                { 
                                    isSignUp && (
                                        <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> 
                                    )
                                } 
                            </Grid>
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                            >
                                { 
                                    isSignUp ? 'Sign Up' : 'Sign In'
                                }
                            </Button>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <GoogleLogin 
                                    render={(renderProps) => (
                                        <Button 
                                            className={classes.googleButton} 
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
                            </div>
                            <Grid container justifyContent='center'>
                                <Grid item>
                                    <Button style={{marginTop:'1rem', backgroundColor:'#e8e8e8'}} variant="contained" onClick={switchMode}>
                                        {
                                            isSignUp ? 'Already have an account ? Sign In' : "Don't have an account ? Sign Up"
                                        }
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>       
                    </>
                )
            }
        </Paper>
    </Container>
    )
  }


export default Auth;
