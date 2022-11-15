import React, { useState,useEffect } from 'react'
import  "../styles/Navbar.css"
import data from "../data/data.json"
import {Navbar,Container,Nav,Form,Button,FormControl} from  'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
const searchicon=<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"/></svg>
const cartIcon = <svg className="temp" xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 0 24 24" width="30px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
const profile=<svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 0 24 24" width="35px" fill="white"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/></svg>


const Navbaree = (history) => {

  const location = useLocation();
  const path = location.pathname;
  const [display, setDisplay] = useState(
    path === "/login" ? false : true
  );
  useEffect(() => {
    path === "/login" ? setDisplay(false) : setDisplay(true)
  }, [path])
  
console.log(path,display)

  const navigate = useNavigate(); 

  const[keyword,setKeyword]=useState("")

  function submitHandler(e){
    e.preventDefault();
    console.log(keyword)
    if(keyword.trim()){
     navigate(`/product/${keyword}`)
    }
    else{
      navigate('/product')
   }

  }
  return (
      <>
   
   {display && (
    
  <Navbar collapseOnSelect expand="lg" sticky="top" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand className='logo' href="/"><img id="logoimage" src={data.logo} alt="Not" width="150" height="45"   /></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      {/* <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link> */}
      <div className='searcharea'>
      <Form className="d-flex" onSubmit={submitHandler} >
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2 searchbox"
          aria-label="Search"
          onChange={(e)=>setKeyword(e.target.value)}
          
        />
       
          <Button variant="warning" type='submit'>{searchicon}</Button>
        
        
      </Form>
      </div>
    </Nav>
   <Link className='cart' to={`/login`}>
     {profile}
    </Link>
    <a  className='cart' href="https://store.mi.com/in/site/login"> {cartIcon} CART (0)</a>
    </Navbar.Collapse>
    </Container>
  </Navbar>
 
   


   )}
   </>
  )
}

export default Navbaree