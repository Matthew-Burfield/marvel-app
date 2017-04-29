import React from 'react'
import { Route } from 'react-router-dom'
import PageTransition from './PageTransition'
import Landing from './Landing'

export default props => (
  <div>
    <PageTransition>
      <Route path='/' component={Landing} />
      <Route path='/search' component />
    </PageTransition>
  </div>
)
