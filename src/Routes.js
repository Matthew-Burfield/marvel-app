import React from 'react'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Header from './Header'
import Landing from './Landing'
import Search from './Search'
import '../public/style.css'

const Routes = () => {
  return (
    <Provider store={store}>
      <div className='app'>
        <Header />
        <Route exact path='/' component={Landing} />
        <Route exact path='/search' component={Search} />
      </div>
    </Provider>
  )
}

export default Routes
