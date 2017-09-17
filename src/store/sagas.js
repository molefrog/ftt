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
import {
  SETUP_WITH_CARD,
  setIsSyncing,
  loadAccount,
  SYNC_TRANSACTIONS,
  UPDATE_EXPENSE_TAG,
  setExpenseTag
} from './modules/transactions'
import { loadCards } from './modules/cards'

const TOKEN_LS_KEY = 'FTT_TOKEN'
const { localStorage } = window

function* getApiToken() {
  return yield select(getSessionToken)
}

function* logout() {
  const token = yield getApiToken()

  if (!token) {
    return
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

function* logoutSaga() {
  while (true) {
    yield take(LOGOUT)
    yield logout()
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

    const cardsResponse = yield apiClient.get('/api/cards')

    yield put(loadCards(cardsResponse.data))
    yield put(push('/welcome/cards'))

    const action = yield take(SETUP_WITH_CARD)
    const cardId = action.payload.cardId

    yield put(setIsSyncing(true))

    const setupResponse = yield apiClient.post(`/api/cards/${cardId}/setup`)
    yield put(loadAccount(setupResponse.data))
    yield delay(1000)

    yield put(setIsSyncing(false))
    yield put(setLoading(false))
    yield put(push('/dashboard'))
  }
}

export function* appInitSaga() {
  const token = localStorage.getItem(TOKEN_LS_KEY)

  if (token) {
    yield put(setToken(token))

    const apiClient = axios.create({
      headers: { Authorization: token }
    })

    try {
      const accountResponse = yield apiClient.get(`/api/account`)

      if (!accountResponse.data) {
        throw new Error('The account data is empty')
      }

      yield put(loadAccount(accountResponse.data))
    } catch (error) {
      yield logout()
      yield put(push('/welcome'))
      return
    }

    yield put(push('/dashboard'))
  } else {
    yield put(push('/welcome'))
  }
}

function* syncAccountSaga() {
  while (true) {
    yield take(SYNC_TRANSACTIONS)

    yield put(setIsSyncing(true))
    yield delay(1000)

    const token = yield getApiToken()

    const apiClient = axios.create({
      headers: { Authorization: token }
    })

    try {
      const response = yield apiClient.post('/api/sync')
      yield put(loadAccount(response.data))
    } catch (error) {}

    yield put(setIsSyncing(false))
  }
}

function* taggingSaga() {
  while (true) {
    const action = yield take(UPDATE_EXPENSE_TAG)

    const token = yield getApiToken()

    const { id, isNeeds } = action.payload
    yield put(setExpenseTag(id, isNeeds))

    const apiClient = axios.create({
      headers: { Authorization: token }
    })

    try {
      const needs = isNeeds ? 'true' : 'false'
      yield apiClient.put(`/api/expenses/${id}/tag?is_needs=${needs}`)
    } catch (error) {}
  }
}

export function* rootSaga() {
  yield [authorizeAppSaga(), logoutSaga(), syncAccountSaga(), taggingSaga()]
}
