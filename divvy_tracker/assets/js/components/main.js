import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'

// Main controls what content is shown per route
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
    </Switch>
  </main>
)

export default Main
