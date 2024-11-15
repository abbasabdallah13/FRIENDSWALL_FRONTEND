import * as React from "react"
import { Grow, Grid, Box } from '@mui/material'
import { useSelector } from "react-redux"
import Posts from "../components/posts/Posts";
import UserBannerContainer from "../components/userBanner/UserBannerContainer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import GlobalVariablesContext from "../context/globalVariables";
import Sidebar from "../components/Sidebar"
import Spinner from "../components/Spinner"
import { Helmet } from "react-helmet";

export default function Component() {
   
    const[searchByQuery, setSearchByQuery] = React.useState('');
    const { setCurrentId, scrollToTopButton, setScrollToTopButton} = React.useContext(GlobalVariablesContext)
        
    const { isLoading } = useSelector(state => state.posts)
        
    const [createMemoryForm, setCreateMemoryForm] = React.useState(false);

    React.useEffect(() => {
      window.addEventListener('scroll', () => {
        if(window.scrollY > 100){
          setScrollToTopButton(true);
        }else{
          setScrollToTopButton(false);
        }
      })
    }, []);
    
    
  
  return (
    <>
      <Helmet>
        <title>FriendsWall - Homepage</title>
      </Helmet>
      <main>
        <Box sx={{position:'relative'}}>
              {
                  scrollToTopButton && (
                  <Box style={{position:'fixed', bottom:'0.5rem', right:'1rem', zIndex:'11'}} onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <ScrollToTop />
                  </Box>
                )
              }
        <Grow in>
                <Grid sx={{flexDirection: {xs: 'column-reverse', md: 'row'}}} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                  {
                    isLoading ? (
                      <Grid item xs={12} sm={4} md={9}  sx={{display:'flex', justifyContent:'center', alignItems:'center', height: '100%'}}>
                        <Spinner />
                      </Grid>
                    ) : (searchByQuery === 'user') ? (
                      <Grid item xs={12} sm={4} md={9} >
                        <UserBannerContainer />
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={12} md={8} sx={{margin: '1rem 0 0 1rem'}} >
                        <Posts setScrollToTopButton={setScrollToTopButton} setCreateMemoryForm={setCreateMemoryForm} setCurrentId={setCurrentId}  />
                      </Grid>
                    )
                  }
                  <Grid item xs={12} sm={12} md={3}>
                    <Sidebar setSearchByQuery={setSearchByQuery} setCreateMemoryForm={setCreateMemoryForm} createMemoryForm={createMemoryForm} />
                  </Grid>
                </Grid>
        </Grow>
        </Box>
      </main>
    </>
    

  )
};

