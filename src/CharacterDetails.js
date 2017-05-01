import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const { object, arrayOf } = PropTypes
const DEFAULT_CLASS_LIST = 'Grid-cell character-details'

/**
 * CharacterDetails shows the selected Marvel Character's name, description, first comic appearance,
 * and list of all comics that the character has appeared in
 */
class CharacterDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classList: DEFAULT_CLASS_LIST,
      hero: this.props.listOrCharacters.length > 0 ? this.props.listOrCharacters.filter(hero => '' + hero.id === this.props.match.params.heroID)[0] : undefined
    }
    this.setDefaultClassList = this.setDefaultClassList.bind(this)
  }

  componentWillMount () {
    if (this.props.clientRect && this.state.classList === DEFAULT_CLASS_LIST) {
      this.setState({
        classList: `${DEFAULT_CLASS_LIST} before-transition`
      })
      setTimeout(this.setDefaultClassList, 100)
    }
  }

  setDefaultClassList () {
    this.setState({
      classList: DEFAULT_CLASS_LIST
    })
  }

  /**
   * Given the list of comics this character has appeared in,
   * output them in an unordered list in order of year released
   */
  getSeriesAppearances (series) {
    const sortedSeries = series.items.sort((a, b) => {
      const aStr = a.name.substr(a.name.lastIndexOf('(') + 1)
      const aYear = aStr.split(/\s|\)/)[0]
      const bStr = b.name.substr(b.name.lastIndexOf('(') + 1)
      const bYear = bStr.split(/\s|\)/)[0]
      if (aYear < bYear) {
        return -1
      }
      return 1
    })
    if (sortedSeries.length > 0) {
      return (
        <div>
          <h4>First ever appearance in: {sortedSeries[0].name}</h4>
          <h4>Other appearances in:</h4>
          <ul>
            {sortedSeries.map(item => {
              return <li key={item.resourceURI}>{item.name}</li>
            })}
          </ul>
        </div>
      )
    }
    return null
  }


  displayButton (Name, linkArray) {
    return linkArray.length > 0
    ? <a className='details' target='_blank' href={linkArray[0].url}>{Name}</a>
    : null
  }

  render () {
    const hero = this.state.hero
    if (hero) {
      const heroWikiLink = hero.urls.filter(url => url.type === 'wiki')
      const heroComicsLink = hero.urls.filter(url => url.type === 'comiclink')
      return (
        <div className={this.state.classList}>
          <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} />
          <div>
            <h1>{hero.name}</h1>
            <h4>{hero.description}</h4>
            {this.getSeriesAppearances(hero.series)}
            <div className='links'>
              {this.displayButton('View Wiki', heroWikiLink)}
              {this.displayButton('View Comics', heroComicsLink)}
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className='Grid-cell character-details' style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Please go back and search again</h1>
        <div className='links'>
          <Link className='error' to='/'>Home</Link>
        </div>
      </div>
    )
  }
}

CharacterDetails.propTypes = {
  listOrCharacters: arrayOf(object),
  clientRect: object,
  match: object
}

const mapStateToProps = (state) => {
  return {
    listOrCharacters: state.listOfCharacters[state.searchChar] || [],
    clientRect: state.clientRect
  }
}

export default connect(mapStateToProps)(CharacterDetails)
