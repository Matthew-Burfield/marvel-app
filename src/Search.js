import React from 'react'
import { connect } from 'react-redux'
import Transition from 'react-overlays/lib/Transition'
import PropTypes from 'prop-types'
import SearchBar from './SearchBar'
import Results from './Results'


const Search = ({searchTerm, match}) => (
  <div className='landing-container'>
    <Transition
      in
      transitionAppear
      timeout={100}
      className='fade'
      enteredClassName='fly-up'
    >
      <div className='main-container'>
        <SearchBar />
      </div>
    </Transition>
    {searchTerm.length > 0 &&
      <Results match={match} />
    }
  </div>
)

Search.propTypes = {
  searchTerm: PropTypes.string,
  match: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  }
}

export default connect(mapStateToProps)(Search)
