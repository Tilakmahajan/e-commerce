import React, { useEffect, useState, useContext } from 'react';
import './navbar.css';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { CiSearch } from "react-icons/ci";
import List from '@mui/material/List';
import { IoMdClose } from "react-icons/io";
import Slide from '@mui/material/Slide';
import { mycontext } from '../../App';

const Dropdown = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const context = useContext(mycontext);
  const [selectedTab, setSelectedTab] = useState(null);

  const handleOpenModel = () => setIsOpenModel(true);
  const selectcountry = (index , country) => {
    setSelectedTab(index)
    context.setSelectedCountry(country);
    setIsOpenModel(false);
  }

  
  const [countryList, setcountryList] = useState([]);
  useEffect(() => {
   
      setcountryList(context.countryList);
    
  }, []);



  const filterlist = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
      setcountryList(context.countryList);
      return;
    }
    const filteredCountries = context.countryList.filter(country => 
      country.country.toLowerCase().includes(searchTerm)
    );
    setcountryList(filteredCountries);
  }

  return (
    <div className="collapse navbar-collapse ms-5 ps-2" id="navbarContent">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle fs-3"
            href="#"  
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={handleOpenModel}
          >
            {context.selectedCountry=='' ? 'Select Country' : context.selectedCountry.substr(0,10)}

          </a>
        
        </li>
      </ul>

      <Dialog
        open={isOpenModel}
        onClose={() => setIsOpenModel(false)}
        className='locationModal p-5'
      >
        <h4 className='mb-0 mt-2'>Choose your country</h4>
        <p>Enter your address and we will specify the offer for your area.</p>
        <button onClick={() => setIsOpenModel(false)} className='close_'><IoMdClose/></button>
        <form class="d-flex search2" role="search">
          <input class="form-control " type="search" onChange={filterlist} placeholder="Search your area" aria-label="Search" />
          <button class="btn btn-outline-success mx-2" type="submit">Search</button>
          
          
        </form>
        <ul className='locationList font-weight-bold mt-3 fs-5'>
         {
           countryList?.length!==0 && countryList.map((country, index) => {
             return (
               <li key={index} className='list-item'><button className={`${selectedTab==index ? 'active': ''}`} onClick={() => selectcountry(index , country.country)}>{country.country}</button></li>
             )
           })
         }

        </ul>
      </Dialog>
    </div>
  )
}

export default Dropdown;
