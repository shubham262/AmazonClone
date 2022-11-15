import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
import "../styles/productcard.css"



const Product = ({product}) => {
  const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value:product.ratings,
    isHalf:true,
    size:window.innerWidth <600?18:24
}
var img=Object.values(product.images[0])

  return (
<Link className='productcard' to={`/products/${product._id}`}>
<img src={img.join("")} alt={product.name} />
<p>{product.name}</p>
<div>
    <ReactStars {...options} /><span>({product.numOfReviews} reviews)</span>
</div>
<span>₹{product.price}</span>


</Link>
  )
}

export default Product