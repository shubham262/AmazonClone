import React, { Fragment, useEffect } from 'react'
import Loader from "../component/Loader"
import {useSelector,useDispatch} from "react-redux"
import { clearErrors, getProduct } from '../actions/productAction'
import Product from "../component/Product.js"



const refr = () => {

    useEffect(() => {
    
    }, []) 
    

  return (
    <div>refr</div>
  )
}

export default refr