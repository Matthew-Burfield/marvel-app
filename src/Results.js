import React from 'react'
import { connect } from 'react-redux'
import Transition from 'react-overlays/lib/Transition'
import PropTypes from 'prop-types'
import MarvelCharacter from './MarvelCharacter'

const { string, array, bool, object, func } = PropTypes

const Results = ({ results, searchTerm, isLoading, match, dispatch }) => {
  const resultsDisplay = () => {
    const filteredResults = results.filter(hero => {
      return hero.name.toUpperCase().includes(searchTerm.toUpperCase())
    })

    if (!isLoading && filteredResults.length === 0) {
      return (
        <div className='results-loading-gif'>
          <h1>No results found. Try another search.</h1>
        </div>
      )
    }

    if (isLoading) {
      return (
        <div className='results-loading-gif'>
          <img src='public/images/loading-small.gif' />
          <h2>Loading...</h2>
        </div>
      )
    }

    return (
      <div className='Grid Grid--gutters Grid--full large-Grid--1of4 med-Grid--1of2'>
        {filteredResults.map(hero => {
          return (
            <MarvelCharacter hero={hero} key={hero.id} match={match} dispatch={dispatch} />
          )
        })}
      </div>
    )
  }

  return (
    <Transition
      in
      transitionAppear
      timeout={100}
      className='results-container'
      enteredClassName='display'
    >
      <div>
        {resultsDisplay()}
      </div>
    </Transition>
  )
}

Results.propTypes = {
  searchTerm: string,
  results: array,
  isLoading: bool,
  match: object,
  dispatch: func
}

Results.defaultProps = {
  results: []
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    results: state.searchChar.length > 0 ? state.listOfCharacters[state.searchChar] : [],
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps)(Results)
