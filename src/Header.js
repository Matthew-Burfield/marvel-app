import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { setSearchTerm } from './actionCreators'

const Header = (props) => {
  const handleSearchTerm = (e) => {
    props.dispatch(setSearchTerm(e.target.value))
  }

  return (
    <header>
      <div className='headerContainer'>
        <Link to='/'>
          <span className='headerLogo'>MARVEL</span>
        </Link>
        {props.showSearch && <input
          onChange={handleSearchTerm}
          value={props.searchTerm}
          type='text'
          placeholder='Search'
        />}
      </div>
    </header>
  )
}

Header.propTypes = {
  showSearch: PropTypes.bool,
  searchTerm: PropTypes.string,
  dispatch: PropTypes.func
}


export default Header
