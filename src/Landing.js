import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import { setSearchTerm, saveMarvelCharacters } from './actionCreators'
import Header from './Header'
import Results from './Results'


class Landing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mainContainerClass: 'main-container',
      resultsContainerClass: 'results-container',
      loading: false
    }
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
  }

  handleSearchTermChange (e) {
    const { searchesCompleted, dispatch } = this.props
    const searchChar = e.target.value.length > 0 ? e.target.value[0].toUpperCase() : ''
    dispatch(setSearchTerm(e.target.value))
    if (searchChar.length === 1 && !searchesCompleted.includes(searchChar)) {
      // Fire off a search request
      this.setState({
        loading: true
      })
      const url = 'https://gateway.marvel.com:443/v1/public/'
      const apiKey = '8af0ed60c8e890096e71cace5997cea0'
      const hash = '54ea9c162ff7f33d4d418a0ea4629829'

      axios
        .get(`${url}/characters?nameStartsWith=${searchChar}&limit=100&ts=1&apikey=${apiKey}&hash=${hash}`)
        .then(response => {
          dispatch(saveMarvelCharacters(searchChar, response.data.data.results))
          this.setState({
            loading: false
          })
        })
        .catch(error => {
          console.error('axios error', error)
        })
    }
  }

  handleSearchFormSubmit (e) {
    e.preventDefault()
    this.setState({
      mainContainerClass: 'main-container fly-up',
      resultsContainerClass: 'results-container display'
    })
  }

  render () {
    return (
      <div className='landing-container'>
        <Header />
        <div className={this.state.mainContainerClass}>
          <img width='50%' height='auto' src='public/images/marvel-logo.png' alt='Marvel Logo' />
          <h3 className='main-sub-title'>Your portal into the entire Marvel Universe!</h3>
          <div className='search-container'>
            <form onSubmit={this.handleSearchFormSubmit}>
              <input
                className='search-bar'
                type='text'
                placeholder='Search for your favorite MARVEL character'
                value={this.props.searchTerm}
                onChange={this.handleSearchTermChange}
              />
              <button className='search-button' type='submit'><div className='search-icon' /></button>
            </form>
          </div>
        </div>
        {this.props.searchTerm.length > 0 &&
          <div className={this.state.resultsContainerClass}>
            <div>
              <Results loading={this.state.loading} />}
            </div>
          </div>
        }
      </div>
    )
  }
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
