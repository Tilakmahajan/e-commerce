import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { HiOutlineHome } from "react-icons/hi";
import { IoShirtOutline } from "react-icons/io5";
import { AiOutlineLaptop } from "react-icons/ai";
import { RiBrushAiLine } from "react-icons/ri";
import { RiBearSmileLine } from "react-icons/ri";
import { MdOutlineChair } from "react-icons/md";
const navigation = () => {
  return (
    <div>
      <nav>
        <div className="container mt-3">
          <div className='row'>
            <div className='col-sm-3 navPart1'>
              <div className="catWrapper">
                <button className=' allCatTab d-flex align-items-center'>
                <span className='icon2 mr-2'><GiHamburgerMenu /></span>
                <span className='text'>ALL CATEGORIES</span>
                <span className='icon2 ml-2'><FaChevronDown /></span>
              </button>
              <div className="sidebarNav">
                  <ul>
                    <li className='list-inline-item'><Link to="/">HOME</Link> </li>
                    <li className='list-inline-item'><Link to="/">FASHION</Link> </li>
                    <li className='list-inline-item'><Link to="/">ELECTRONICS</Link> </li>
                    <li className='list-inline-item'><Link to="/">BEAUTY </Link> </li>
                    <li className='list-inline-item'><Link to="/">TOYS </Link> </li>
                    <li className='list-inline-item'><Link to="/">FURNITURE </Link> </li>
                  </ul>
              </div>
              </div>
            </div>

            <div className='col-sm-9 navPart2 d-flex align-items-center justify-content-end'>

              <ul className='list list-inline ml-auto'>
                <li className='list-inline-item'><Link to="/"><HiOutlineHome /> &nbsp; HOME</Link> </li>
                <li className='list-inline-item'><Link to="/"><IoShirtOutline /> &nbsp; FASHION</Link>
                  <div className='submenu shadow'>
                    <Link to="/"><button>Clothes</button></Link>
                    <Link to="/"><button>Footwear</button></Link>
                    <Link to="/"><button>Watches</button></Link>
                    <Link to="/"><button>Accessories</button></Link>
                  </div>

                </li>
                <li className='list-inline-item'><Link to="/"><AiOutlineLaptop /> &nbsp; ELECTRONICS</Link>
                 <div className='submenu shadow'>
                    <Link to="/"><button>Clothes</button></Link>
                    <Link to="/"><button>Footwear</button></Link>
                    <Link to="/"><button>Watches</button></Link>
                    <Link to="/"><button>Accessories</button></Link>
                  </div></li>
                <li className='list-inline-item'><Link to="/"><RiBrushAiLine /> &nbsp; BEAUTY</Link>
                 <div className='submenu shadow'>
                    <Link to="/"><button>Clothes</button></Link>
                    <Link to="/"><button>Footwear</button></Link>
                    <Link to="/"><button>Watches</button></Link>
                    <Link to="/"><button>Accessories</button></Link>
                  </div></li>
                <li className='list-inline-item'><Link to="/"><RiBearSmileLine /> &nbsp; TOYS</Link>
                 <div className='submenu shadow'>
                    <Link to="/"><button>Clothes</button></Link>
                    <Link to="/"><button>Footwear</button></Link>
                    <Link to="/"><button>Watches</button></Link>
                    <Link to="/"><button>Accessories</button></Link>
                  </div></li>
                <li className='list-inline-item'><Link to="/"><MdOutlineChair /> &nbsp; FURNITURE</Link>
                 <div className='submenu shadow'>
                    <Link to="/"><button>Clothes</button></Link>
                    <Link to="/"><button>Footwear</button></Link>
                    <Link to="/"><button>Watches</button></Link>
                    <Link to="/"><button>Accessories</button></Link>
                  </div></li>
              </ul>
            </div>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default navigation
