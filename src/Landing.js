import React from 'react'
import { Link } from 'react-router-dom'
import '../public/style.css'

export default class Landing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
  }

  handleSearchTermChange (e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render () {
    return (
      <div className='landing'>
        <h1>Search for your favorite Marvel character</h1>
        <input
          className='searchBar'
          type='text'
          placeholder='search'
          value={this.state.searchTerm}
          onChange={this.handleSearchTermChange}
        />
        <Link to='/search'>Search</Link>
      </div>
    )
  }
}
