import React, { createContext, useState } from "react";

const GlobalVariablesContext = createContext();

export function GlobalVariablesProvider({ children }){
    const [scrollToTopButton, setScrollToTopButton] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const[searchByQuery, setSearchByQuery] = useState('');

    
    return (
        <GlobalVariablesContext.Provider value={{searchByQuery, setSearchByQuery, scrollToTopButton, setScrollToTopButton, currentId, setCurrentId }}>
            {children}
        </GlobalVariablesContext.Provider>
    )

}

export default GlobalVariablesContext