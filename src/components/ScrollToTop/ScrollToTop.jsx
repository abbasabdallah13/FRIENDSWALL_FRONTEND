import React from "react";

import backToTop from '../../assets/jumpToTop.png'

import './index.css'

const ScrollToTop = () => {

  const scroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="scroll-container" onClick={scroll}>
          <img src={backToTop} width={'45px'} height={'45px'} alt='back to top' />
    </div>
  )
};

export default ScrollToTop;
