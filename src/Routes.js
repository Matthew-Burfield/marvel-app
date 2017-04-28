import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Heading from './Header'
import Landing from './Landing'
import Search from './Search'

const Routes = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='app'>
          <Heading />
          <Route exact path='/' component={Landing} />
          <Route path='/search' component={Search} />
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default Routes
