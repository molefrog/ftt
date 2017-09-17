import { select, take, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { push } from 'react-router-redux'
import axios from 'axios'

import {
  AUTHORIZE_APPLICATION,
  LOGOUT,
  setToken,
  setLoading,
  getSessionToken
} from './modules/session'
import { SETUP_WITH_CARD, setIsSyncing } from './modules/transactions'
import { loadCards } from './modules/cards'

const TOKEN_LS_KEY = 'FTT_TOKEN'
const { localStorage } = window

function* getApiToken() {
  return yield select(getSessionToken)
}

function* logoutSaga() {
  while (true) {
    yield take(LOGOUT)

    const token = yield getApiToken()

    if (!token) {
      continue
    }

    const apiClient = axios.create({
      headers: { Authorization: token }
    })
    // Discard the token and remove from the LS
    yield apiClient.delete('/api/session')

    yield put(setToken(null))
    localStorage.removeItem(TOKEN_LS_KEY)
    yield put(push('/welcome'))
  }
}

function* authorizeAppSaga() {
  while (true) {
    yield take(AUTHORIZE_APPLICATION)

    yield put(setLoading(true))

    // Obtain a new token from the API
    const createSession = yield axios.post('/api/session')
    const token = createSession.data.token

    // An artificial delay
    yield delay(800)

    // set the new token
    yield put(setToken(token))
    localStorage.setItem(TOKEN_LS_KEY, token)

    const apiClient = axios.create({
      headers: { Authorization: token }
    })

    // const cardsResponse = yield apiClient.get('/api/cards')

    yield put(
      loadCards([
        {
          card_id: 1,
          name: 'Кредитная карта',
          balance: '25495.4',
          payment_system: 'mir'
        },
        {
          card_id: 2,
          name: 'Дебетовая карта',
          balance: '44800.4',
          payment_system: 'visa'
        }
      ])
    )
    yield put(push('/welcome/cards'))

    const action = yield take(SETUP_WITH_CARD)
    const cardId = action.payload
    console.log(cardId)

    yield put(setIsSyncing(true))
    yield delay(700)
    yield put(setIsSyncing(false))
    yield put(setLoading(false))
    yield put(push('/dashboard'))
  }
}

export function* rootSaga() {
  yield [authorizeAppSaga(), logoutSaga()]
}

export function* appInitSaga() {
  const token = localStorage.getItem(TOKEN_LS_KEY)

  if (token) {
    yield put(setToken(token))
    yield put(push('/dashboard'))
  } else {
    yield put(push('/welcome'))
  }
}
