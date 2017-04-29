import React from 'react'
import { connect } from 'react-redux'
import Transition from 'react-overlays/lib/Transition'
import PropTypes from 'prop-types'
import SearchBar from './SearchBar'
import Results from './Results'


class Search extends React.Component {
  render () {
    return (
      <div className='landing-container'>
        <Transition
          in
          transitionAppear
          timeout={100}
          className='fade'
          enteredClassName='fly-up'
        >
          <div className='animation-wrapper'>
            <SearchBar />
          </div>
        </Transition>
        {/* {this.props.searchTerm.length > 0 &&
          <div className={this.state.resultsContainerClass}>
            <div>
              <Results loading={this.state.loading} />}
            </div>
          </div>
        } */}
      </div>
    )
  }
}

Search.propTypes = {
  searchTerm: PropTypes.string,
  searchesCompleted: PropTypes.array,
  dispatch: PropTypes.func
}

Search.defaultProps = {
  searchesCompleted: []
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    searchesCompleted: Object.keys(state.listOfCharacters)
  }
}

export default connect(mapStateToProps)(Search)
