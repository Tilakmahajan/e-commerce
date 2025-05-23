import React from 'react'
import css from './navbar.css'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { CiSearch } from "react-icons/ci";
import List from '@mui/material/List';
import { IoMdClose } from "react-icons/io";

const Dropdown = () => {
  return (
    <div className="collapse navbar-collapse  ms-5 ps-2  " id="navbarContent">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle fs-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Country
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>




      <Dialog open={true} className='locationModal p-5 ' >
    

        <h4 className='mb-0 mt-2'>Choose your country</h4>
        <p>Enter your address and we will specify the offer for your area.</p>
        <button className='close_'><IoMdClose/></button>
        <form class="d-flex search2" role="search">
          <input class="form-control " type="search" placeholder="Search your area" aria-label="Search" />
          <button class="btn btn-outline-success mx-2" type="submit">Search</button>
          
          
        </form>
     

        <ul className='locationList font-weight-bold mt-3 fs-5'>
          <button><li className='list-item'>India</li></button>
          <button><li className='list-item'>USA</li></button>
          <button><li className='list-item'>Canada</li></button>
          <button><li className='list-item'>Australia</li></button>
          <button><li className='list-item'>Germany</li></button>
          <button><li className='list-item'>France</li></button>
          <button><li className='list-item'>Italy</li></button>
          <button><li className='list-item'>Spain</li></button>
          <button><li className='list-item'>Japan</li></button>
          <button><li className='list-item'>China</li></button>
          <button><li className='list-item'>Brazil</li></button>
          <button><li className='list-item'>Mexico</li></button>
          <button><li className='list-item'>Russia</li></button>
          <button><li className='list-item'>South Africa</li></button>
          <button><li className='list-item'>Argentina</li></button>
          <button><li className='list-item'>Netherlands</li></button>
          <button><li className='list-item'>Sweden</li></button>
          <button><li className='list-item'>Norway</li></button>
          <button><li className='list-item'>Denmark</li></button>







          <button><li className='list-item'>Finland</li></button>
          <button><li className='list-item'>Brazil</li></button>
          <button><li className='list-item'>Mexico</li></button>
          <button><li className='list-item'>Russia</li></button>
          <button><li className='list-item'>South Africa</li></button>
          <button><li className='list-item'>Argentina</li></button>
          <button><li className='list-item'>Netherlands</li></button>
          <button><li className='list-item'>Sweden</li></button>
          <button><li className='list-item'>Norway</li></button>
          <button><li className='list-item'>Denmark</li></button>
        </ul>

      </Dialog>
    </div>
  )
}

export default Dropdown
