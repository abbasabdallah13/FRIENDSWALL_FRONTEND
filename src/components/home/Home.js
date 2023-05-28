import React, {useEffect, useState} from "react";

import { Container, Grow, Grid, AppBar, TextField, Button, CircularProgress } from '@material-ui/core'
import ArrowDropDownCircle from '@material-ui/icons/ArrowDropDownCircle'
import Cancel from '@material-ui/icons/CancelOutlined'
import ChipInput from 'material-ui-chip-input'

import { useDispatch, useSelector } from "react-redux"

import { useNavigate, useLocation } from 'react-router-dom'

import { getPosts, getPostsPerPage, searchAction } from '../../actions/posts'

import Posts from "../../components/posts/Posts";
import Form from "../../components/form/Form";
import Paginate from '../Pagination'
import UserBannerContainer from "../userBanner/UserBannerContainer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

import useStyles from './styles'

import noPostsFound from '../../assets/nopostsfound.png'


function useQuery() {
  return new URLSearchParams(useLocation().search) // 1- this is to know on which page we are currently 
  //on and what search term are we looking for
}

const Home = ({currentId, setCurrentId, scrollToTopButton, setScrollToTopButton}) => {

    const [userSearch, setUserSearch] = useState('');
    const [userSearchArray, setUserSearchArray] = useState([]);
    const [openSearch, setOpenSearch] = useState(false);  
    const [postSearch, setPostSearch] = useState('');
    const [tags, setTags] = useState([]);
    const [createMemoryForm, setCreateMemoryForm] = useState(false);
    const [showPaginate, setShowPaginate] = useState(true);
    
    
    const query = useQuery();   
    const navigate = useNavigate(); 
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    
    const { users, posts, isLoading } = useSelector(state => state.posts)
    
    const page = query.get('page') || 1; 
    
    useEffect(() => {
      dispatch(getPosts())
    }, []);
    
    useEffect(() => {
     if(!location.search){
      setShowPaginate(true)
     }
    }, [openSearch]);

    useEffect(() => {
      window.addEventListener('scroll', () => {
        if(window.scrollY > 100){
          setScrollToTopButton(true);
        }else{
          setScrollToTopButton(false);
        }
      })
    }, []);
    
    const handleKeyPress = (e) => {
      if(e.keyCode === 13){
        search();
      }
    }

    const handleAdd = (tag) => {
      setTags([...tags, tag])
      setUserSearch('');
    }
    
    const handleDelete = (tagToDelete) => {
      setTags(tags.filter(tag => tag !== tagToDelete))
    }

    const userSearchTrim = (e) => {
      setUserSearch(e.target.value)
      setUserSearchArray(e.target.value.trim().split(/\s+/g));
      setTags([]);
      setPostSearch('');

    }

    const search = () => {
      setOpenSearch(false)
      setShowPaginate(false)
      if(userSearchArray.length || postSearch.trim() || tags.length){
        dispatch(searchAction({userSearch: userSearchArray.join(','),postSearch, tags:tags.join(',')}))
        navigate(`/posts/search?userSearch=${userSearchArray.join(',')}&postSearch=${postSearch || 'none'}&tags=${tags.join(',')}`)
      }else{
        navigate('/') 
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
  
  return (
    <div style={{position:'relative'}}>
          {
              scrollToTopButton && (
              <div style={{position:'fixed', bottom:'0.5rem', right:'1rem', zIndex:'11'}} onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <ScrollToTop />
              </div>
            )
          }
    <Grow in>
      <Container maxWidth='xl'>
            <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
              {
                isLoading ? (
                  <Grid item xs={12} md={9} >
                    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height: '100%' }}>
                      <CircularProgress />
                    </div>
                  </Grid>
                ) : ( users.length && !posts.length ) ? (
                  <Grid item xs={12} md={9} >
                    <UserBannerContainer />
                  </Grid>
                ) : ( !users.length && posts.length ) ? (
                  <Grid item xs={12} md={9} >
                    <Posts setScrollToTopButton={setScrollToTopButton} setCreateMemoryForm={setCreateMemoryForm} setCurrentId={setCurrentId}  />
                  </Grid>
                ): ( !users.length && !posts.length ) ? (
                    <Grid item xs={12} md={9}>
                      <div style={{display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#fff', marginTop:'1rem', borderRadius:'8px', padding:'2rem'}}>
                        <img style={{maxWidth:'100%'}}  src={noPostsFound} alt='no posts found' />
                      </div>
                    </Grid>
                ) : ''
              }
              <Grid item xs={12} sm={8} md={3} >
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
                    <AppBar className={classes.appBarSearch} position="static" color='inherit'>
                    <TextField 
                        style={{backgroundColor: postSearch || tags.length > 0 ? '#d8d8d8' : '#fff'}}
                        disabled={postSearch.length || tags.length > 0}
                        variant='outlined'
                        label='Search Users'
                        onKeyPress={handleKeyPress}
                        fullWidth
                        value={userSearch} //value of a state that is initially defined as an empty string
                        onChange={userSearchTrim} //sets the search state to the value of the input
                      />
                      <TextField 
                        disabled={userSearch.length>0}
                        style={{backgroundColor: userSearch ? '#d8d8d8' : '#fff', margin:'0.7rem 0'}}
                        name='search'
                        variant='outlined'
                        label='Search Memories'
                        fullWidth
                        onKeyPress={handleKeyPress} //function that allows search on enter click
                        value={postSearch} //value of a state that is initially defined as an empty string
                        onChange={(e)=>{setUserSearch(''); setPostSearch(e.target.value)}} //sets the search state to the value of the input
                      />
                      <ChipInput 
                        disabled={userSearch.length>0}
                        style={{backgroundColor: userSearch ? '#d8d8d8' : '#fff', margin:'0 0 0.7rem 0'}}
                        value={tags} //it is an array defined above using state
                        onAdd={(chip) => handleAdd(chip)} //it is a function that adds to the array of tags and thus creating
                        //a chip input tag on click of the enter button 
                        onDelete={(chip) => handleDelete(chip)} //it is a function that removes the tag upon clicking its
                        //corresponding x button
                        label='Search Tags' //it is the label that labels the input field 
                        variant="outlined" //certain style.check the docs for other styles.
                      />
                      <div style={{display:'flex', width: '100%', justifyContent:'space-around'}}>
                        <Button onClick={clear} style={{backgroundColor:'red', color:'white'}} variant='contained'>Clear</Button>
                        <Button onClick={search} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
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
                      <Paginate page={page} component={'home'} />
                    )
                  }
              </Grid>
            </Grid>
      </Container>
    </Grow>
  </div>
    

  )
};

export default Home;
