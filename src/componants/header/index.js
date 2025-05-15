import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../navbar'
const header = () => {
  return (
    <div className='headerWrapper'>
      <div className="top-strip bg-blue">
        <div className="container">
     <p className="mb-0 mt-0 text-center">Due to the <b>COVID 19 </b>epidemic, orders may be processed with a slight delay</p>
      </div>
      </div>
      {/* <div className="header d-flex">
        <div className="container">
          <div className='row'>
            <div className="logoWrapper d-flex align-items-center col-sm-2 ">
              <Link to={"/"}><img src="logo.png" alt="LOGO" /></Link>
            </div>
            <div className="part2  d-flex align-items-center col-sm-10"></div>
          </div>
        </div>
      </div> */}
      <Navbar />
    </div>
  )
}

export default header
