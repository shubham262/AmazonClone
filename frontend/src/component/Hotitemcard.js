import React from 'react'


const Hotitemcard = ({image,index}) => {
  return (
    <div className='hotitemcard'>
    <img src={image} alt={`${index} product`} />
    {/* <p>{name}</p>
    <span>{price}</span> */}
    </div>
  )
}

export default Hotitemcard