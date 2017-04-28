import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import { setSearchTerm, saveMarvelCharacters } from './actionCreators'
import Header from './Header'


const Landing = (props) => {
  const handleSearchTermChange = (e) => {
    const { searchesCompleted } = props
    props.dispatch(setSearchTerm(e.target.value))
    if (e.target.value.length === 1 && !searchesCompleted.includes(props.searchTerm[0])) {
      // Fire off a search request
      const url = 'https://gateway.marvel.com:443/v1/public/'
      const apiKey = '8af0ed60c8e890096e71cace5997cea0'
      const hash = '54ea9c162ff7f33d4d418a0ea4629829'
      const searchChar = e.target.value.length > 0 ? e.target.value[0].toUpperCase() : ''
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
    <div className='landing-container'>
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
  searchesCompleted: PropTypes.array,
  dispatch: PropTypes.func
}

Landing.defaultProps = {
  searchesCompleted: []
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    searchesCompleted: Object.keys(state.listOfCharacters)
  }
}

export default connect(mapStateToProps)(Landing)
