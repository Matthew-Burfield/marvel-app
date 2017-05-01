import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { clearClientRect } from './actionCreators'
const { object, arrayOf, func } = PropTypes

/**
 * CharacterDetails shows the selected Marvel Character's name, description, first comic appearance,
 * and list of all comics that the character has appeared in
 */
class CharacterDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      styles: {},
      imgStyles: {},
      hero: this.props.listOrCharacters.length > 0 ? this.props.listOrCharacters.filter(hero => '' + hero.id === this.props.match.params.heroID)[0] : undefined
    }
    this.setDefaultClassList = this.setDefaultClassList.bind(this)
  }

  /**
   * Manually set the style attributes and then set a timeout to set
   * the styles back to nothing. This will give the transition effect
   *
   * @memberOf CharacterDetails
   */
  componentDidMount () {
    const clientRect = this.props.clientRect
    if (clientRect && Object.getOwnPropertyNames(this.state.styles).length === 0) {
      const transitionStyles = {
        position: 'absolute',
        overflow: 'hidden',
        height: 200,
        width: `${clientRect.width}px`,
        top: `${clientRect.top}px`,
        left: `${clientRect.left}px`
      }
      const imgTransitionStyle = {
        height: '200px',
        width: `${clientRect.width}px`
      }
      this.setState({
        styles: transitionStyles,
        imgStyles: imgTransitionStyle
      })
      setTimeout(this.setDefaultClassList, 100)
    }
  }

  setDefaultClassList () {
    this.setState({
      styles: {},
      imgStyles: {}
    })
    this.props.dispatch(clearClientRect())
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

  getImageUrl (hero) {
    return `${hero.thumbnail.path.replace('http', 'https')}.${hero.thumbnail.extension}`
  }

  render () {
    const hero = this.state.hero
    if (hero) {
      const heroWikiLink = hero.urls.filter(url => url.type === 'wiki')
      const heroComicsLink = hero.urls.filter(url => url.type === 'comiclink')
      return (
        <div className='Grid-cell character-details' style={this.state.styles}>
          <img style={this.state.imgStyles} src={this.getImageUrl(hero)} />
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
  match: object,
  dispatch: func
}

const mapStateToProps = (state) => {
  return {
    listOrCharacters: state.listOfCharacters[state.searchChar] || [],
    clientRect: state.clientRect
  }
}

export default connect(mapStateToProps)(CharacterDetails)
