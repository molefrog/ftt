import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import buildHistory from './history'
import { configureStore } from './store'
import App from './App'

// inject global application styles
import './styles/global'

// Build router history and create Redux store
const history = buildHistory()
const { store, sagaMiddleware } = configureStore(history)

// sagaMiddleware.

const Application = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(<Application />, document.getElementById('root'))
