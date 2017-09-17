import { select, take, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { push } from 'react-router-redux'

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

    // Discard the token and remove from the LS
    yield put(setToken(null))
    localStorage.removeItem(TOKEN_LS_KEY)
    yield put(push('/welcome'))
  }
}

function* authorizeAppSaga() {
  while (true) {
    yield take(AUTHORIZE_APPLICATION)

    yield put(setLoading(true))
    yield delay(700)

    const token = 1234

    // set the new token
    yield put(setToken(token))
    localStorage.setItem(TOKEN_LS_KEY, token)

    const token2 = yield getApiToken()
    console.log(token2)

    yield put(
      loadCards([
        { id: 1, name: 'Кредитная карта', balance: 25495.4 },
        { id: 2, name: 'Дебетовая карта', balance: 44800.4 }
      ])
    )
    yield put(push('/welcome/cards'))

    const action = yield take(SETUP_WITH_CARD)

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
