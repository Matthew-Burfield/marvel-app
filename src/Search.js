import React from 'react'
import preload from '../public/data.json'

const Search = () => {
  return (
    <div className='search'>
      <div className='Grid Grid--gutters Grid--full large-Grid--1of4 med-Grid--1of2'>
        {preload.data.results.map(hero => {
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
        })}
      </div>
    </div>
  )
}

export default Search
