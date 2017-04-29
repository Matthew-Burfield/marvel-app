import React from 'react'
import PropTypes from 'prop-types'

const { shape, string } = PropTypes


const MarvelCharacter = ({ hero }) => {
  return (
    <div className='Grid-cell'>
      <div style={{ height: 200, minWidth: 200, width: '100%', overflow: 'hidden', backgroundColor: 'tomato' }}>
        <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} height='auto' width='100%' style={{ minHeight: 200, minWidth: 200 }} />
      </div>
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
  })
}

export default MarvelCharacter
