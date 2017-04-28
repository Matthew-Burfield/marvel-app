import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearchTerm } from './actionCreators'
import '../public/style.css'

const { string, func } = React.PropTypes

const Landing = (props) => {
  const handleSearchTermChange = (e) => {
    props.dispatch(setSearchTerm(e.target.value))
  }

  return (
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
  )
}

Landing.propTypes = {
  searchTerm: string,
  dispatch: func
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  }
}

export default connect(mapStateToProps)(Landing)
