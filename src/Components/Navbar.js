import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
                <div className='container'>
    <ul className='navlist'>
                <li>
                    <Link className="text" to="/">Login</Link>
                    </li>/
                <li>
                    <Link  className="text" to ="/registration">Registration</Link>
                    </li>
                    
                    </ul>
                    </div>
    </div>
  )
}

export default Navbar