import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from './styles'
import Dashboard from './routes/Dashboard'
import Settings from './routes/Settings'
import Review from './routes/Review'
import Navigation from './components/Navigation'
import NoMatch from './components/NoMatch'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Switch>
            <Redirect from="/" to="/settings" />
            <Route path="/settings" component={Settings} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/review" component={Review} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
