import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Heading from './Header'
import Landing from './Landing'
import Search from './Search'

const Routes = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Heading />
        <Route exact path='/' component={Landing} />
        <Route path='/search' component={Search} />
      </div>
    </BrowserRouter>
  )
}

export default Routes
