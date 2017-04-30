import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const { object, arrayOf } = PropTypes

const CharacterDetails = ({ listOrCharacters, match }) => {
  const hero = listOrCharacters.filter(hero => '' + hero.id === match.params.heroID)[0]
  return (
    <div className='Grid-cell character-details'>
      <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} />
      <div>
        <h1>{hero.name}</h1>
        <h3>{hero.description}</h3>
        <h3>Appears in:</h3>
        <ul>
          {hero.series.items.map(series => {
            return <li key={series.name}>{series.name}</li>
          })}
        </ul>
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
    listOrCharacters: state.listOfCharacters[state.searchChar]
  }
}

export default connect(mapStateToProps)(CharacterDetails)
