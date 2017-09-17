import { select, take, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { push } from 'react-router-redux'

import { AUTHORIZE_APPLICATION, setToken, setLoading } from './modules/session'
import { SETUP_WITH_CARD, setIsSyncing } from './modules/transactions'
import { loadCards } from './modules/cards'

function* authorizeAppSaga() {
  while (true) {
    yield take(AUTHORIZE_APPLICATION)

    yield put(setLoading(true))
    yield delay(700)
    yield put(setToken(1234))

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
  yield [authorizeAppSaga()]
}
