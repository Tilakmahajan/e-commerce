import React from 'react'
import { Link } from 'react-router-dom'

import Navigation from './navigation/navigation';
import Navbar from '../navbar'
const header = () => {
  return (
    <div>

    <div className='headerWrapper'>
      <div className="top-strip bg-blue p-3">
        <div className="container">
     <p className="mb-0 mt-0 text-center">Due to the <b>COVID 19 </b>epidemic, orders may be processed with a slight delay</p>
      </div>
      </div>
      <Navbar />
      <Navigation/>
    </div>
    </div>
  )
}

export default header
