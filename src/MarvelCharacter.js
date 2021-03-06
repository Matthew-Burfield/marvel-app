import React from 'react'
import { Link } from 'react-router-dom'
import { setClientRect } from './actionCreators'
import PropTypes from 'prop-types'

const { shape, string, object, func } = PropTypes


/**
 * Converts the image url to https since it's being hosted on github pages for now
 */
const getImageUrl = (hero) => {
  return `${hero.thumbnail.path.replace('http', 'https')}.${hero.thumbnail.extension}`
}

/**
 * Displays the individual Marvel Character on /search route
 */
const MarvelCharacter = ({ hero, match, dispatch }) => {
  return (
    <div className='Grid-cell'>
      <Link
        to={`${match.path}/${hero.id}`}
        onClick={e => dispatch(setClientRect(e.target.getBoundingClientRect()))}
      >
        <div style={{ height: 200, minWidth: 200, width: '100%', overflow: 'hidden', backgroundColor: 'tomato' }}>
          <img src={getImageUrl(hero)} height='auto' width='100%' style={{ minHeight: 200, minWidth: 200 }} />
        </div>
      </Link>
      <div>
        <h3>{hero.name}</h3>
      </div>
    </div>
  )
}

MarvelCharacter.propTypes = {
  hero: shape({
    name: string,
    thumbnail: shape({
      path: string,
      extension: string
    })
  }),
  match: object,
  dispatch: func
}

export default MarvelCharacter
