import { AppBar, Box, Button, Grid, TextField } from '@mui/material';
import * as React from 'react'
import Form from './Form/Form';
import Paginate from './Pagination';
import ArrowDropDownCircle from '@mui/icons-material/ArrowDropDownCircle'
import Cancel from '@mui/icons-material/CancelOutlined'
import { useDispatch, useSelector } from "react-redux"
import queryString from 'query-string'


import { navigate, useLocation } from '@reach/router'
import { getPostsPerPage, postsSearchAction, searchAction } from '../actions/posts';
import GlobalVariablesContext from '../context/globalVariables';
import { userSearchAction } from '../actions/users';

function Sidebar({setSearchByQuery, setCreateMemoryForm, createMemoryForm}) {
    const dispatch = useDispatch();
    const location = useLocation();

    const page = queryString.parse(location.search).page || 1; 


    const [userSearch, setUserSearch] = React.useState('');
    const [userSearchArray, setUserSearchArray] = React.useState([]);
    const [openSearch, setOpenSearch] = React.useState(false);  
    const [postSearch, setPostSearch] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [showPaginate, setShowPaginate] = React.useState(true);
    const [pageNumber, setPageNumber] = React.useState(1)

    const { currentId, setCurrentId } = React.useContext(GlobalVariablesContext)
  
  const search = () => {
      setOpenSearch(false)
      setShowPaginate(false)
      if(userSearchArray.length > 0){
        dispatch(userSearchAction({userSearch: userSearchArray.join(',')}))
        setSearchByQuery('user');
      }else{
        dispatch(postsSearchAction({postSearch, tags: tags.join(',')}))
        setSearchByQuery('post')
      }
    }
  
    const clear = () => {
      setUserSearch('');
      setPostSearch('');
      setTags([])
      setOpenSearch(false)
      dispatch(getPostsPerPage(page))
      navigate('/')
      setShowPaginate(true)
    }  
  
    const userSearchTrim = (e) => {
      setUserSearch(e.target.value)
      setUserSearchArray(e.target.value.trim().split(/\s+/g));
      setTags([]);
      setPostSearch('');
    }
  
    const handleKeyPress = (e) => {
      if(e.keyCode === 13){
        search();
      }
    }

    React.useEffect(() => {
        if(!location.search){
         setShowPaginate(true)
        }
       }, [openSearch]);



  return (
        <Box>
            <Button onClick={()=> setOpenSearch((state) => !state)} style={{position:'relative', width:'100%',display:'flex', alignItems:'center', padding:'1rem', backgroundColor:'#f5f5f5', borderRadius: '8px', marginBottom: '0.7rem'}}>
                Search
                <span style={{cursor:'pointer', position:'absolute', right:'2rem'}}>
                  {
                    !openSearch ? (
                      <ArrowDropDownCircle fontSize='medium' />
                    ) : (
                      <Cancel style={{cursor:'pointer'}} fontSize='medium' />
                    )
                  }
                 </span>
            </Button>
            {
                openSearch && (
                    <AppBar sx={{borderRadius: 4, marginBottom: '1rem', display: 'flex', padding: '16px'}} position="static" color='inherit'>
                    <TextField 
                        style={{backgroundColor: postSearch || tags.length > 0 ? '#d8d8d8' : '#fff'}}
                        disabled={postSearch.length || tags.length > 0}
                        variant='outlined'
                        label='Search Users'
                        onKeyPress={handleKeyPress}
                        fullWidth
                        value={userSearch} 
                        onChange={userSearchTrim} 
                      />
                      <TextField 
                        disabled={userSearch.length>0}
                        style={{backgroundColor: userSearch ? '#d8d8d8' : '#fff', margin:'0.7rem 0'}}
                        name='search'
                        variant='outlined'
                        label='Search Memories'
                        fullWidth
                        onKeyPress={handleKeyPress} 
                        value={postSearch} 
                        onChange={(e)=>{setUserSearch(''); setPostSearch(e.target.value)}} //sets the search state to the value of the input
                      />
                      <div style={{display:'flex', width: '100%', justifyContent:'space-around'}}>
                        <Button onClick={clear} style={{backgroundColor:'red', color:'white'}} variant='contained'>Clear</Button>
                        <Button onClick={search} color='primary' variant='contained'>Search</Button>
                      </div>
                    </AppBar>
                  )
                }
                <Button 
                  onClick={()=> setCreateMemoryForm((state) => !state)} 
                  style={{position:'relative',width:'100%',display:'flex', alignItems:'center', padding:'1rem', backgroundColor:'#f5f5f5', borderRadius: '8px', marginBottom: '0.7rem'}}
                >
                  Add Memory
                  <span style={{cursor:'pointer', position:'absolute', right:'2rem'}}>
                    {
                      !createMemoryForm ? (
                        <ArrowDropDownCircle fontSize='medium' />
                      ) : (
                        <Cancel fontSize='medium' />
                      )
                    }
                  </span>
                </Button>
                  {
                    createMemoryForm && (
                      <Form currentId={currentId} setCurrentId={setCurrentId} />
                    )
                  }
                  {
                    showPaginate && (
                      <Paginate page={'home'} pageNumber={pageNumber} setPageNumber={setPageNumber} />
                    )
                  }
        </Box>
  )
}
export default Sidebar