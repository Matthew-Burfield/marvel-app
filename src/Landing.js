import React from 'react'
import Transition from 'react-overlays/lib/Transition'
import SearchBar from './SearchBar'


const Landing = () => (
  <div className='landing-container'>
    <Transition
      in
      transitionAppear
      timeout={100}
      className='above-screen'
      enteredClassName='main-container'
    >
      <div>
        <SearchBar />
      </div>
    </Transition>
  </div>
)

export default Landing
