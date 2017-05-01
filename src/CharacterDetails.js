import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const { object, arrayOf } = PropTypes

const CharacterDetails = ({ listOrCharacters, match }) => {
  const hero = listOrCharacters.length > 0 ? listOrCharacters.filter(hero => '' + hero.id === match.params.heroID)[0] : undefined

  const getSeriesAppearances = (series) => {
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


  const displayButton = (Name, linkArray) => {
    return linkArray.length > 0
    ? <a className='details' target='_blank' href={linkArray[0].url}>{Name}</a>
    : null
  }


  if (hero) {
    const heroWikiLink = hero.urls.filter(url => url.type === 'wiki')
    const heroComicsLink = hero.urls.filter(url => url.type === 'comiclink')
    return (
      <div className='Grid-cell character-details'>
        <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} />
        <div>
          <h1>{hero.name}</h1>
          <h4>{hero.description}</h4>
          {getSeriesAppearances(hero.series)}
          <div className='links'>
            {displayButton('View Wiki', heroWikiLink)}
            {displayButton('View Comics', heroComicsLink)}
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

CharacterDetails.propTypes = {
  listOrCharacters: arrayOf(object),
  match: object
}

const mapStateToProps = (state) => {
  return {
    listOrCharacters: state.listOfCharacters[state.searchChar] || []
  }
}

export default connect(mapStateToProps)(CharacterDetails)
