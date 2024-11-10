import React from "react";
import { useSelector } from "react-redux";
import Banner from "./Banner/Banner";
import { Box } from "@mui/material";

const UserBannerContainer = () => {
    const { users } = useSelector(state => state.user)

  return (
        <Box sx={{display:'flex', flexWrap:'wrap', gap: '0.5rem'}}>
            {
              users?.map(user=> (
                <Banner key={user._id}  user={user} addFriendBtn={true} className={'two'} />
              )
              )
            }
        </Box>
  )
};

export default UserBannerContainer;
