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
      <Navbar />
    </div>
  )
}

export default header
