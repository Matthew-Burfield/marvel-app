import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Landing from './Landing'
import '../public/style.css'

const Routes = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='app'>
          <Route exact path='/' component={Landing} />
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default Routes
