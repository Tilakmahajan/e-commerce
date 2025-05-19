import React from 'react'
import css from './navbar.css'
import { Link } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import Searchbox from './searchbox'
import Dropdown from './dropdown';
const navbar = () => {
  return (
    <div>
 <nav class="navbar navbar-expand-lg bg-body-tertiary mt-2 container">
  <div class="container-fluid d-flex justify-content-between align-items-center">
    <div className='d-flex justify-content-between align-items-center '>
    <Link to="/" class="navbar-brand">
      <img class="logo" src="logo.png" alt="LOGO" />
    </Link>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
<Dropdown/>
    </div>

    <Searchbox />
    <div className='user-icon d-flex justify-content-center align-items-center ml-auto p-2'>
     <button className='user-circle'><FaRegUser /></button>
     <div className='carttab ml-auto d-flex justify-content-center align-items-center'>
      <span className='price px-3'>₹350</span>
      <div className='position-relative '>
     <button className='user-circle '><HiShoppingBag /></button>
      <span className='cart-count d-flex justify-content-center align-items-center '>2</span>
      </div>
     </div>
     
    </div>
    
  </div>
</nav>


</div>

  )
}

export default navbar
