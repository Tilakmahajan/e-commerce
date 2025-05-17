import React from 'react'
import css from './navbar.css'
import { Link } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
const navbar = () => {
  return (
    <div>
 <nav class="navbar navbar-expand-lg bg-body-tertiary mx-auto ">
  <div class="container-fluid d-flex justify-content-between align-items-center">
    <div className='d-flex justify-content-between align-items-center '>
    <Link to="/" class="navbar-brand">
      <img class="logo" src="logo.png" alt="LOGO" />
    </Link>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
  


    <div class="collapse navbar-collapse" id="navbarContent">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle fs-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Country
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
    </div>

    <form class="d-flex search" role="search">
      <input class="form-control me-2" type="search" placeholder="Search For Products" aria-label="Search" />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
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
