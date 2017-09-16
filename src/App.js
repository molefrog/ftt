import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// Global application screens
import Dashboard from './routes/Dashboard'
import Settings from './routes/Settings'
import Review from './routes/Review'
import NoMatch from './components/NoMatch'

// Local components
import TopBar from './components/TopBar'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <TopBar />

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
