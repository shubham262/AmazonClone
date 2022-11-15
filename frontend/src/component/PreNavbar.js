import React, { useState,useEffect } from 'react'
import "../styles/PreNavbar.css"
import { useLocation } from "react-router-dom";

const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>


const PreNavbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [display, setDisplay] = useState(
    path === "/login" ? false : true
  );

  useEffect(() => {
    path === "/login" ? setDisplay(false) : setDisplay(true)
  }, [path])
  
  return (
    <>
       {display && (
        <div className="PreNav">
             <div>
                 <a  href="/">{menuIcon} All</a>
                 <a  href="/">Best Seller</a>
                 <a  href="/">Mobiles</a>
                 <a  href="/">Customer Service</a>
                 <a  href="/">Today's Deals</a>
                 <a  href="/">Fashion</a>
                 <a  href="/">Electronics</a>
                 <a  href="/">New Releases</a>
             </div>
             <img className='shoppingimg' src="https://images-eu.ssl-images-amazon.com/images/G/31/IN-hq/2021/img/Mobile_Traffic_/XCM_Manual_1321458_1651511_IN_3781247_400x39_en_IN._CB655944656_.jpg" alt="shopping made easy" />
             <div>
            
               
             </div>

    </div>
       )}
    </>
  
  )
}

export default PreNavbar