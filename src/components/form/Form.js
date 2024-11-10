import React, { useState, useEffect } from "react";
import { TextField, Typography, Button, Paper } from "@mui/material";
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from '@reach/router';
import { createPost, updatePost } from "../../actions/posts";


const Form = ({currentId, setCurrentId, setEditPostModal}) => {
  
  const dispatch = useDispatch();

  const post = useSelector(state => currentId ? state?.posts?.posts?.find(p => p._id === currentId) : null)
  
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [postData, setPostData] = useState({
    title: '', message: '', tags:'', selectedFile: '', creator: '', createdAt: '', comments:[]
  })


  useEffect(() => {
    if(post){
      setPostData(post)
    }
  }, [post]);
  

  const handleSubmit = (e) => {
    e.preventDefault(); //to not get a refresh in the browser
    
     
    if(currentId === 0){
      dispatch(createPost({...postData, firstName: user?.result?.firstName, lastName:user?.result?.lastName, creator: user?.result?._id, createdAt: new Date().toISOString(), tags: postData.tags.map(tag => tag.trim()) }, navigate))
      localStorage.setItem('openedPost',JSON.stringify({...postData, firstName: user?.result?.firstName, lastName:user?.result?.lastName, creator: user?.result?._id, createdAt: new Date().toISOString(), tags: postData.tags.map(tag => tag.trim()) }))
    }else{
      dispatch(updatePost(currentId,{...postData, tags: postData.tags.map(tag => tag.trim())}))
      localStorage.setItem('openedPost',JSON.stringify({...postData, tags: postData.tags.map(tag => tag.trim()), comments:[]}))
      navigate(`/posts/${postData._id}`)
      setEditPostModal && setEditPostModal(false)
    }
    clear()

  }


  const clear = () => {
    setCurrentId(0);
    setPostData({
      title:'',
      message:'',
      tags:'',
      selectedFile:''
    })
  }

  if(!user?.result){
    return ( //
      <Paper sx={{padding:'10px'}}> 
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other posts.
        </Typography>
      </Paper>
    )
  }

  return (
        <Paper sx={{padding: '15px'}}>
          <form autoComplete="off" noValidate onSubmit={handleSubmit} style={{margin: '5px', display: 'flex', flexDirection:'column', rowGap: '15px' ,flexWrap: 'wrap', justifyContent: 'center'}}> 
            <Typography variant="h6">
              {!currentId ? `Creating` : 'Editing'} a Memory
            </Typography>
            <TextField name="title" variant="outlined" label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} />
            <TextField name="message" variant="outlined" multiline maxRows={4} label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />
            <TextField name="tags" variant="outlined" label='Tags (separate by a comma)' fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
            <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} />
            <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="error" size="large" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper>
    )
};

export default Form;
