import React from 'react'
import css from './navbar.css'

const Dropdown = () => {
  return (
     <div class="collapse navbar-collapse " id="navbarContent">
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
  )
}

export default Dropdown
