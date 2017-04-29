import React from 'react'
import { connect } from 'react-redux'
import Transition from 'react-overlays/lib/Transition'
import PropTypes from 'prop-types'
import MarvelCharacter from './MarvelCharacter'

const { string, array, bool, object } = PropTypes

const Results = ({ results, searchTerm, isLoading, match }) => {
  const resultsDisplay = () => {
    if (isLoading) {
      return (
        <div className='results-loading-gif'>
          <img src='public/images/loading-small.gif' />
          <h2>Loading...</h2>
        </div>
      )
    } else {
      return (
        <div className='Grid Grid--gutters Grid--full large-Grid--1of4 med-Grid--1of2'>
          {results.filter(hero => {
            return hero.name.toUpperCase().includes(searchTerm.toUpperCase())
          }).map(hero => {
            return (
              <MarvelCharacter hero={hero} key={hero.id} match={match} />
            )
          })}
        </div>
      )
    }
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
  match: object
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
