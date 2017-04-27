import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div className='headerContainer'>
        <Link to='/'>
          <h1 className='headerLogo'>MARVEL</h1>
        </Link>
      </div>
    </header>
  )
}

export default Header
