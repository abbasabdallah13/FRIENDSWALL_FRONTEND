import React from 'react'
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import Cancel from "@mui/icons-material/Cancel"
import { Box, Button, Typography } from '@mui/material';
import Form from '../../Form.jsx';


function PostOptions({postCreator, postModal, setPostModal, editPostModal, setEditPostModal, deletePostModal, setDeletePostModal, anywhereClick, currentId, setCurrentId, deletePostFunc, id}) {
  return (
    <Box sx={{postion: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
        {/* display more icon in case the creator of the post is logged in */}
        {
            postCreator && (
              <Box sx={{cursor:'pointer', position:'absolute',right:'1rem',top:'1rem'}} onClick={()=>setPostModal(prev=>!prev)}>
                <MoreHorizIcon style={{fontSize:'2rem'}} />
              </Box>
            )
          }
          
          {/* display options modal if the creator of the post is logged in */}
          {
            postModal && (
              <Box ref={anywhereClick} sx={{position:"absolute", top:'2.5rem', right:'1rem', display:'flex', flexDirection:'column',gap:'0.5rem', backgroundColor:'#fff',border:'1px solid black', padding:'1rem'}}>
                <Button onClick={()=>{setPostModal(false);setEditPostModal(true); setCurrentId(id)}} variant="outlined">
                  Edit Post
                </Button>
                <Button onClick={()=>{setPostModal(false);setDeletePostModal(true)}}  sx={{backgroundColor:'red', color:'white'}}>
                  Delete Post
                </Button>
              </Box>
            )
          }

          {/* display delete or edit post modals in the middle of the screen based on the option chosen */}
          {
              ( deletePostModal || editPostModal ) && (
                <Box sx={{position:'absolute', top:'0', left:'0',width: '100%', height:'100vh', backgroundColor:'rgb(0,0,0,0.8)', borderRadius:'15px', color:'white', display:'flex', justifyContent:'center', alignItems:'center'}}>
                  {
                    deletePostModal ? (
                      <Box ref={anywhereClick} sx={{padding:'1rem', borderRadius:'8px', display:'flex', flexDirection:'column', alignItems:'center', width:'75%'}}>
                        <Typography variant="body2">Are you sure you want to delete this post ?</Typography>
                        <Box>
                          <Button variant="contained" style={{backgroundColor:'red', color:'white', width:"45%"}} onClick={deletePostFunc}>Delete</Button>
                          <Button style={{marginLeft:'1rem', border:'1px solid white',color:'white', width:"45%"}} onClick={()=>setDeletePostModal(false)}>Cancel</Button>
                        </Box>
                      </Box>
                    ) : editPostModal ? (
                      <Box ref={anywhereClick} className='form-container'>
                        <Box onClick={()=>setEditPostModal(false)}  style={{cursor:'pointer', position:'absolute', right:'1rem', top:'0', zIndex:'13'}}>
                          <Cancel style={{fill:'#000'}}/>
                        </Box>
                        <Form currentId={currentId} setCurrentId={setCurrentId}  setEditPostModal={setEditPostModal} />
                      </Box>
                    ) : ''
                  }
                </Box>
              )
            }
    </Box>
  )
}

export default PostOptions