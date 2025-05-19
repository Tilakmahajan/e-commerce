import React from 'react'
import css from './navbar.css'

const searchbox = () => {
  return (
    
         <form class="d-flex search" role="search">
            <input class="form-control me-2" type="search" placeholder="Search For Products" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
    
  )
}

export default searchbox
