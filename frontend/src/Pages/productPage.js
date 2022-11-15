import React, { Fragment, useEffect, useState } from 'react'
import Loader from "../component/Loader"
import {useSelector,useDispatch} from "react-redux"
import { clearErrors, getProduct } from '../actions/productAction'
import Product from "../component/Product.js"
import "../styles/productPage.css"
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import {useAlert} from 'react-alert'
const categories=[
  "laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones"
]
const ProductPage = ({match}) => {

const dispatch=useDispatch();
const alert=useAlert()
const {loading,product,productCount,resultPerPage,error}=useSelector((state)=>state.products)
const { keyword } = useParams();
const [page, setPage] =useState(1);
const [price, setprice] = useState([0,25000])
const [category, setcategory] = useState("")
// const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
//   setPage(value);
// };
// const keyword=match.params.keyword
// console.log(keyword)
useEffect(() => {
if(error){
  alert.error(error)
  dispatch(clearErrors())
}
dispatch(getProduct(keyword,page,price,category))
 
}, [dispatch,keyword,page,price,category,alert,error])


const priceHandler=(event,newPrice)=>{
setprice(newPrice)
}

  return <Fragment>
    {loading?<Loader/>:
    <Fragment>
    <h2 className='productsHeading'>Products</h2>
    <div className='productsDiv'>
    {product && product.map((product)=>
        <Product key={product._id} product={product}/>
        
       )} 
    </div>
    <div className='filterBox'>
      <Typography>Price</Typography>
      <Slider
        value={price}
        onChange={priceHandler}
        valueLabelDisplay="auto"
        // aria-labelledby='range-slider'
        getAriaLabel={() => 'Temperature range'}
        min={0}
        max={25000}
       />
       <Typography>Categories</Typography>
       <ul className='categoryBox'>
       {categories.map((category)=>(
        <li className='category-link' key={category} onClick={()=>setcategory(category)}>{category}</li>
       ))}

       </ul>
    </div>
    <Stack   justifyContent="center"
  alignItems="center" spacing={2} marginTop={4} marginBottom={8}>
   <Typography>Page: {page}</Typography>
    <Pagination count={Math.floor(productCount/resultPerPage)+1} color="primary" size="large" onChange={(e, page)=>{if (page !== null) {setPage(page);}}}/>
    </Stack>
    
    </Fragment>}
  </Fragment>
}

export default ProductPage