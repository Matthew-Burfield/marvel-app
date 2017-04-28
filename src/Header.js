import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import { setSearchTerm, saveMarvelCharacters } from './actionCreators'

const Header = (props) => {
  const handleSearchTerm = (e) => {
    const { searchTerm, searchesCompleted } = props
    props.dispatch(setSearchTerm(e.target.value))
    if (searchTerm.length === 1 && !searchesCompleted.includes(props.searchTerm[0])) {
      // Fire off a search request
      const url = 'https://gateway.marvel.com:443/v1/public/'
      const apiKey = '8af0ed60c8e890096e71cace5997cea0'
      const hash = '54ea9c162ff7f33d4d418a0ea4629829'
      const searchChar = searchTerm.length > 0 ? searchTerm[0].toUpperCase() : ''
      axios
        .get(`${url}/characters?nameStartsWith=${searchChar}&limit=100&ts=1&apikey=${apiKey}&hash=${hash}`)
        .then(response => {
          props.dispatch(saveMarvelCharacters(searchChar, response.data.data.results))
        })
        .catch(error => {
          console.error('axios error', error)
        })
    }
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
  searchesCompleted: PropTypes.array,
  dispatch: PropTypes.func
}

Header.defaultProps = {
  searchesCompleted: []
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    searchesCompleted: Object.keys(state.listOfCharacters)
  }
}

export default connect(mapStateToProps)(Header)
