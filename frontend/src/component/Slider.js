import React from 'react'
import  Carousel from 'react-bootstrap/Carousel'
import "../styles/reactcarosel.css"



const Slider = ({start}) => {
    return (
        <Carousel fade className='slider' >
            {
                start.map((item,index)=>(
                    <Carousel.Item  key={item} interval={1500}>
                      <img className="d-block w-100"
                        src={item}
                        alt={`${index} slide`}
                    />
    
                    </Carousel.Item>
                ))
    
            }
        </Carousel>
      )
}

export default Slider