import React, { Fragment, useEffect } from 'react'
import Slider from "../component/Slider"
import data from "../data/data.json"
import Cards from "../component/Cards"
import Slickslider from "../component/Slickslider"
import Product from "../component/Product.js"
import { clearErrors, getProduct } from '../actions/productAction'
import {useSelector,useDispatch} from "react-redux"
import Loader from '../component/Loader'
import { useAlert } from 'react-alert'



// const product={
//   name:"Blue Shirt",
//   images:[{url: "https://i.ibb.co/DRST11n/1.webp"}],
//   price:"₹3000",
//   _id:"abhishek",

// }




const Home = () => {
const alert=useAlert()
  const dispatch=useDispatch();
const {loading,product,productCount,error}=useSelector((state)=>state.products)
  useEffect(() => {
    if(error){
      alert.error(error)
        dispatch(clearErrors())
    }
    dispatch(getProduct())
 
  }, [dispatch,error,alert])
  console.log(error)
 
  return (
   <Fragment>
    {loading?<Loader/>: <Fragment>
      <Slider start={data.banner.start} />
    <Cards cards={data.cards}/>
    <Slickslider start={data.Slickslider.start}/>
 
    <div className='containereeeee' id='container'>

      {/* <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/> */
       }

       {product && product.map((product)=>
        <Product product={product}/>
        
       )} 
    </div>



    </Fragment>}
   </Fragment>
  )
}

export default Home