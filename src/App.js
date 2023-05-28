import React, { useState } from "react";

import { GoogleOAuthProvider } from '@react-oauth/google';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Container } from '@material-ui/core'

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import PostDetails from "./components/postDetails/PostDetails";
import UserDetails from "./components/userDetails/UserDetails";
import Friends from "./components/Friends/Friends";
import Friend from "./components/Friends/Friend/Friend";

const App = () => {
  const [bannerOrFriends, setBannerOrFriends] = useState('friends');
  const [scrollToTopButton, setScrollToTopButton] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  
return (
  <BrowserRouter>
  <GoogleOAuthProvider clientId="172814880951-g88h6lvoupkcgore600n9qt83oilascb.apps.googleusercontent.com">
    <Container maxWidth='xl'> 
      <Navbar setBannerOrFriends={setBannerOrFriends} />
      <Routes>
        <Route path='/' exact  Component={() => <Navigate to='/posts' />} />
        <Route path='/posts' exact  element={<Home currentId={currentId} setCurrentId={setCurrentId}  scrollToTopButton={scrollToTopButton} setScrollToTopButton={setScrollToTopButton} />} />
        <Route path='/posts/search' exact  Component={Home} />
        <Route path='/posts/:id' exact  element={<PostDetails currentId={currentId} setCurrentId={setCurrentId} scrollToTopButton={scrollToTopButton} setScrollToTopButton={setScrollToTopButton} />} />
        <Route path='/friends' exact  element={<Friends bannerOrFriends={bannerOrFriends} setBannerOrFriends={setBannerOrFriends}/>} />
        <Route path='/users/friend/:id' exact  element={<Friend />} />
        <Route path='/auth' exact  Component={Auth} />
        <Route path='/user/:id' exact  Component={UserDetails} />
      </Routes>
  </Container>
  </GoogleOAuthProvider>
  </BrowserRouter>
)};

export default App;
