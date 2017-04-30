import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearchTerm, saveMarvelCharacters, setLoadingFlag } from './actionCreators'
import axios from 'axios'
import PropTypes from 'prop-types'
import preload from '../public/data.json'

const SearchBar = ({ searchTerm, searchesCompleted, dispatch }) => {
  const handleSearchTermChange = (e) => {
    const searchChar = e.target.value.length > 0 ? e.target.value[0].toUpperCase() : ''
    dispatch(setSearchTerm(e.target.value))
    dispatch(saveMarvelCharacters('A', preload.data.results))
    // if (searchChar.length === 1 && !searchesCompleted.includes(searchChar)) {
    //   const url = 'https://gateway.marvel.com:443/v1/public/'
    //   const apiKey = '8af0ed60c8e890096e71cace5997cea0'
    //   const hash = '54ea9c162ff7f33d4d418a0ea4629829'

    //   dispatch(setLoadingFlag(true))

    //   axios
    //     .get(`${url}/characters?nameStartsWith=${searchChar}&limit=100&ts=1&apikey=${apiKey}&hash=${hash}`)
    //     .then(response => {
    //       dispatch(setLoadingFlag(false))
    //       dispatch(saveMarvelCharacters(searchChar, response.data.data.results))
    //     })
    //     .catch(error => {
    //       console.error('axios error', error)
    //     })
    // }
  }

  const handleSearchTermSubmit = e => {
    e.preventDefault()
  }

  return (
    <div>
      <img width='50%' height='auto' src='public/images/marvel-logo.png' alt='Marvel Logo' />
      <h3 className='main-sub-title'>Your portal into the entire Marvel Universe!</h3>
      <div className='search-container'>
        <form onSubmit={handleSearchTermSubmit}>
          <input
            className='search-bar'
            type='text'
            placeholder='Search for your favorite MARVEL character'
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <Link className='search-button' to='/search'><div className='search-icon' /></Link>
        </form>
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  searchesCompleted: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    searchesCompleted: Object.keys(state.listOfCharacters)
  }
}

export default connect(mapStateToProps)(SearchBar)
