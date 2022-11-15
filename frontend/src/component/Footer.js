import React, { useState,useEffect } from 'react'
import "../styles/footer.css"
import data from "../data/data.json"
import { useLocation } from "react-router-dom";
const Footer = ({footer}) => {
    const location = useLocation();
  const path = location.pathname;
  const [display, setDisplay] = useState(
    path === "/login" ? false : true
  );
  useEffect(() => {
    path === "/login" ? setDisplay(false) : setDisplay(true)
  }, [path])
  function handleclick(){

    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
    }
    
  return (
    
   <>
   {display && (
   <>
 <button onClick={handleclick} className="scolltotop" >Back to Top</button>

 <div className="footere">

                  <div> 
                     <p> Get To Know Us</p>
                      {footer.support.map((item,index)=>(
                         <a key={item.url} href={item.url}>{item.name}</a>

                      ))}
                  </div>

                  <div>
                 <p>Connect with Us</p>
                  {footer.shopAndLearn.map((item,index)=>(
                         <a key={item.url} href={item.url}>{item.name} </a>

                      ))}

                  </div>
                  <div>
                   <p> Make Money with Us</p>
                    {footer.retailStore.map((item,index)=>(
                         <a key={item.url} href={item.url}>{item.name}</a>

                      ))}
                  </div>

                  <div>
                           <p>  Let Us Help You</p>
                             {footer.aboutUS.map((item,index)=>(
                         <a key={item.url} href={item.url}>{item.name}</a>

                      ))}
                  </div>


                 

                  
        </div>
        <div className="footerBorder">
        <div><center><img id="logoimage" src={data.logo} alt="Not" width="150" height="45"   /></center><br></br>
      <center><div> Copyright © Shubham Manohar</div></center> 
      </div>
      
       
        </div>









   </>
   )}
   </>
  )
}

export default Footer