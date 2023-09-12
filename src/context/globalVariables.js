import React, { createContext, useState } from "react";

const GlobalVariablesContext = createContext();

export function GlobalVariablesProvider({ children }){
    const [bannerOrFriends, setBannerOrFriends] = useState('friends');
    const [scrollToTopButton, setScrollToTopButton] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    
    return (
        <GlobalVariablesContext.Provider value={{bannerOrFriends, setBannerOrFriends, scrollToTopButton, setScrollToTopButton, currentId, setCurrentId }}>
            {children}
        </GlobalVariablesContext.Provider>
    )

}

export default GlobalVariablesContext