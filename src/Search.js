import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import Header from './Header'
// import preload from '../public/data.json'

const url = 'https://gateway.marvel.com:443/v1/public/'
const apiKey = '8af0ed60c8e890096e71cace5997cea0'
const hash = '54ea9c162ff7f33d4d418a0ea4629829'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      characters: {
        char: this.props.searchChar,
        count: 0,
        offset: 0,
        results: []
      }
    }
  }

  componentDidMount () {
    if (this.props.searchChar.length !== 0) {
      axios.get(`${url}/characters?nameStartsWith=${this.props.searchChar}&limit=100&ts=1&apikey=${apiKey}&hash=${hash}`)
          .then(response => {
            this.setState({
              characters: {
                char: this.props.searchChar,
                count: response.data.data.count,
                offset: response.data.data.offset,
                results: response.data.data.results
              }
            })
          })
          .catch(error => {
            console.error('axios error', error)
          })
    }
  }

  render () {
    return (
      <div>
        <Header showSearch searchTerm={this.props.searchTerm} dispatch={this.props.dispatch} />
        <div className='search'>
          <div className='Grid Grid--gutters Grid--full large-Grid--1of4 med-Grid--1of2'>
            {this.state.characters.results
            .filter(hero => {
              return hero.name.toUpperCase().includes(this.props.searchTerm.toUpperCase())
            })
            .map(hero => {
              return (
                <div className='Grid-cell' key={hero.id}>
                  <div style={{ height: 200, minWidth: 200, width: '100%', overflow: 'hidden', backgroundColor: 'tomato' }}>
                    <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} height='auto' width='100%' style={{ minHeight: 200, minWidth: 200 }} />
                  </div>
                  <div>
                    <h3>{hero.name}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  searchTerm: PropTypes.string,
  searchChar: PropTypes.string,
  dispatch: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm,
    searchChar: state.searchChar
  }
}

export default connect(mapStateToProps)(Search)
