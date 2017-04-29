import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const { shape, string, object } = PropTypes


const MarvelCharacter = ({ hero, match }) => {
  return (
    <div className='Grid-cell'>
      <Link to={`${match.path}/${hero.id}`}>
        <div style={{ height: 200, minWidth: 200, width: '100%', overflow: 'hidden', backgroundColor: 'tomato' }}>
          <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} height='auto' width='100%' style={{ minHeight: 200, minWidth: 200 }} />
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
  match: object
}

export default MarvelCharacter
