import React from "react";

import backToTop from '../../assets/jumpToTop.png'

import './index.css'
import { Box } from "@mui/material";

const ScrollToTop = () => {

  const scroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Box className="scroll-container" onClick={scroll}>
          <img src={backToTop} width={'45px'} height={'45px'} alt='back to top' />
    </Box>
  )
};

export default ScrollToTop;
