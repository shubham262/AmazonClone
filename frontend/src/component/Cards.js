import React from 'react'
import Fourinonecards from "./Fourinonecards.js"
import "../styles/cards.css"

const Cards = ({cards}) => {
  return (
    <div className='cards'>


{
            cards.map((item,index)=>(

                <Fourinonecards a={item.a} text={item.text} key={index} b={item.b} c={item.c} d={item.d} index={index}  />
            ))
        
        
        }

    </div>
  )
}

export default Cards