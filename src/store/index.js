import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

// Application modules
import sessionReducer from './modules/session'
import transactionsReducer from './modules/transactions'
import cardsReducer from './modules/cards'

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
    session: sessionReducer,
    cards: cardsReducer,
    transactions: transactionsReducer
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
