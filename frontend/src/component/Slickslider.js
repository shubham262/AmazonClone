import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slick.css"
import Hotitemcard from "./Hotitemcard.js"



function SampleNextArrow(props) {
  const { className,onClick } = props;
  return (
    <div
      className={className}
      style={{display:"none",transition:"all 0.5s", boxShadow: "0px 6px 15px rgba(53, 53, 53, 0.363)",borderRadius:"0.1vmax",padding:"2vmax 1.5vmax 2vmax 1.5vmax ",margin:"1vmax" ,background: "white" ,width:"auto" ,height:"auto", zIndex:"2" }}
      onClick={onClick}
   
    />
  );
}

function SamplePrevArrow(props) {
  const { className,onClick } = props;
  return (
    <div
      className={className}
      style={{ display:"none", boxShadow: "0px 6px 15px rgba(53, 53, 53, 0.363)",borderRadius:"0.1vmax",padding:"2vmax 1.5vmax 2vmax 1.5vmax ",margin:"1vmax" ,background: "white" ,width:"auto" ,height:"auto", zIndex:"2" }}
      onClick={onClick}
    />
  );
}



const Slickslider = ({start}) => {
  function handleMouseEnter(){
    const a=document.querySelector(".slick-prev")
    const v=document.querySelector(".slick-next")
    a.style.display="block";
    v.style.display="block";
 
  }
  function handleMouseleave(){
    const a=document.querySelector(".slick-prev")
    const v=document.querySelector(".slick-next")
    a.style.display="none";
    v.style.display="none";
   
  }




    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        
      
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    <div className='slickslider' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseleave}>

    <Slider {...settings}>
    {
      start.map((item,index)=>(
                    
        <Hotitemcard key={item}  image={item} index={index}/>
    
                    
                ))
    
            }
    </Slider>
  </div>
  )
}

export default Slickslider

