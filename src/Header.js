import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className='headerContainer'>
        <Link to='/'>
          <span className='headerLogo'>MARVEL</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
