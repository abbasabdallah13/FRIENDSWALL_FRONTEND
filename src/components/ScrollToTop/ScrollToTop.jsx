import React from "react";
import backToTop from '../../assets/jumpToTop.png'
import { Box } from "@mui/material";

const ScrollToTop = () => {

  return (
    <Box>
      <img src={backToTop} width={'45px'} height={'45px'} alt='back to top' />
    </Box>
  )
};

export default ScrollToTop;
