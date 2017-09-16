import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import sessionReducer from './modules/session'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './sagas'

export function configureStore(history) {
  // ---
  // Middlewares
  // ---
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [
    sagaMiddleware,
    thunkMiddleware,
    routerMiddleware(history)
  ]

  // ---
  // Enhancers
  // ---
  const enhancers = [
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ]

  // ---
  // Root reducer
  // ---
  const rootReducer = combineReducers({
    router: routerReducer,
    session: sessionReducer
  })

  // ---
  // Store
  // ---
  const store = createStore(
    rootReducer,
    {}, // initialState
    compose(applyMiddleware(...middlewares), ...enhancers)
  )

  sagaMiddleware.run(rootSaga)
  return { store, sagaMiddleware }
}
