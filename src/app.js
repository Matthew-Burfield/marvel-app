import React from 'react'
import '../public/style.css'

export default class App extends React.Component {
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
      <div>
        <h1>Search for your favorite Marvel character</h1>
        <input
          className='searchBar'
          type='text'
          placeholder='search'
          value={this.state.searchTerm}
          onChange={this.handleSearchTermChange}
        />
      </div>
    )
  }
}
