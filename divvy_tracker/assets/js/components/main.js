import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/home'
import Dashboard from '../pages/dashboard'

// Main controls what content is shown per route
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/dashboard' component={Dashboard}/>
    </Switch>
  </main>
)

export default Main
