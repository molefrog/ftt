import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

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
    <App />
  </Provider>
)

ReactDOM.render(<Application />, document.getElementById('root'))
