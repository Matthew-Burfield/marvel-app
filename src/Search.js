import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MarvelCharacter from './MarvelCharacter'

const Search = ({ results, searchTerm }) => {
  const showResults = () => {
    if (results.length === 0) {
      return (
        <div><img width='100%' height='auto' src='public/images/loading-large.gif' /></div>
      )
    }
    return (
      <div className='Grid Grid--gutters Grid--full large-Grid--1of4 med-Grid--1of2'>
        {results.filter(hero => {
          return hero.name.toUpperCase().includes(searchTerm.toUpperCase())
        }).map(hero => {
          return (
            <MarvelCharacter hero={hero} />
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <Header showSearch />
      <div className='search'>
        {showResults()}
      </div>
    </div>
  )
}

Search.propTypes = {
  searchTerm: PropTypes.string,
  results: PropTypes.array
}

Search.defaultProps = {
  searchTerm: '',
  results: []
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    results: state.searchChar.length > 0 ? state.listOfCharacters[state.searchChar] : []
  }
}

export default connect(mapStateToProps)(Search)

