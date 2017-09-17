import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// Global application screens
import Dashboard from './routes/Dashboard'
import Settings from './routes/Settings'
import Review from './routes/Review'
import NotFound from './routes/NotFound'
import Welcome from './routes/Welcome'
import SelectCard from './routes/SelectCard'

// Local components
import TopBar from './components/TopBar'

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />

        <Switch>
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/welcome/cards" component={SelectCard} />
          <Route path="/settings" component={Settings} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/review" component={Review} />
          <Redirect exact from="/" to="/welcome" />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
