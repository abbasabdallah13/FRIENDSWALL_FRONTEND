import React from "react";

import { useSelector } from "react-redux";

import Banner from "./Banner/Banner";

const UserBannerContainer = () => {
    const { users } = useSelector(state => state.posts)

  return (
        <div style={{display:'flex', flexWrap:'wrap', gap: '0.5rem'}}>
            {
              users.map(user=> (
                <Banner key={user._id}  user={user} addFriendBtn={true} className={'two'} />
              )
            )
            }
        </div>
  )
};

export default UserBannerContainer;
