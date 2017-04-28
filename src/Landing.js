import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { setSearchTerm } from './actionCreators'
import Header from './Header'


const Landing = (props) => {
  const handleSearchTermChange = (e) => {
    props.dispatch(setSearchTerm(e.target.value))
  }

  return (
    <div>
      <Header />
      <div className='landing'>
        <h1>Search for your favorite Marvel character</h1>
        <input
          className='searchBar'
          type='text'
          placeholder='search'
          value={props.searchTerm}
          onChange={handleSearchTermChange}
        />
        <Link to='/search'>Search</Link>
      </div>
    </div>
  )
}

Landing.propTypes = {
  searchTerm: PropTypes.string,
  dispatch: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  }
}

export default connect(mapStateToProps)(Landing)
