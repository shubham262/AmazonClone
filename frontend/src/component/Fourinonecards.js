import React from 'react'
import "../styles/fourinonecards.css"

const Fourinonecards = ({a,b,c,d,index,text}) => {
  return (
    <div className='fourinonecards'>
    <div className='layer'>
     <h5>{text}</h5>
        { c && <a href="/"><img className='sm' src={c} alt={`${index } of card 1 `}/></a>}
      { b && <a href="/"><img className='sm' src={b} alt={`${index } of card 2 `}/></a>}
       { a && <a href="/"><img className='sm' src={a} alt={`${index } of card 1 `}/></a>}
        {d && <a href="/"><img className='sm' src={d} alt={`${index } of card 4 `}/></a>}
    </div>
    </div>
  )
}

export default Fourinonecards