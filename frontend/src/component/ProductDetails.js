import React, { Fragment, useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails } from '../actions/productAction'
import  Carousel  from 'react-material-ui-carousel';
import "../styles/productdetails.css"
import ReactStars from "react-rating-stars-component"
import ReviewCard from "./ReviewCard.js"
import Loader from "./Loader"
import {useAlert} from "react-alert"

const ProductDetails = ({clickfn}) => {
  console.log(clickfn())
  const { _id } = useParams();
  console.log(_id)
    const dispatch=useDispatch();

    const alert=useAlert();

const {product,loading,error}=useSelector((state)=>state.productDetails)


// console.log(product,loading,error,product.images)
    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
        dispatch(getProductDetails(_id))
     
      }, [dispatch,_id,error,alert])

      var options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value:product.ratings,
        isHalf:true,
        size:window.innerWidth <600?18:24

     } 
     
   

  return (
   <Fragment>
    {loading?<Loader/>:
      <Fragment>
  <div className='productdetails'>

    <div>
    {/* <Carousel> */}
      {
        product.images && product.images.map((item,i)=>(
      <img width="450" height="500" className='CarouselImage' key={i} src={(Object.values(item)).join("")} alt={`${i} Slide`} />

        ))
      }
    {/* </Carousel> */}
    </div>

    <div>
      <div className='detailsBlock1'>
      <h2>{product.name}</h2>
      <p>Product #{product._id}</p>

      </div>
      <div className='detailsBlock2'>
    <ReactStars {...options} />
    <span>({product.numOfReviews} reviews)</span>
     </div>
     <div className='detailsBlock3'>
      <h1>{`₹${product.price}`}</h1>
      <div className='detailsBlock3-1'>
      <div className='detailsBlock3-1-1'>
      <button>-</button>
      <input value="1" type="number"/>
      <button>+</button>
      </div>
      <button>Add to Cart</button>
      </div>
      <p>Status :
      <b className={product.stock<1?"redColor":"greenColor"}>
        {product.stock<1?"OutofStock":"InStock"}
      </b>
      </p>

      </div>
      <div className='detailsBlock4'>
        Description :<p>{product.description}</p>
      </div>
      <button className='submitReview'>Submit Review</button>
</div>
</div>
<h3 className='reviewsheading'>REVIEWS</h3>
{product.reviews && product.reviews[0]?(
  <div className='reviews'>
    {product.reviews &&
    product.reviews.map((review)=><ReviewCard review={review}/>)
    }
  </div>
):(<p className='noReviews'>No Reviews Yet</p>)}
    </Fragment>
    }
   </Fragment>
    
  )
}

export default ProductDetails