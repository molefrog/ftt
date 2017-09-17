import { createAction, handleActions } from 'redux-actions'
import _ from 'lodash'

// ---
// Constants
// ---
export const SETUP_WITH_CARD = 'TRANSACTIONS/SETUP_WITH_CARD'
export const SET_IS_SYNCING = 'TRANSACTIONS/SET_IS_SYNCING'
export const SET_EXPENSE_TAG = 'TRANSACTIONS/SET_EXPENSE_TAG'
export const LOAD_ACCOUNT = 'TRANSACTIONS/LOAD_ACCOUNT'

// ---
// Action creators
// ---
export const setupWithCard = createAction(SETUP_WITH_CARD, cardId => ({
  cardId
}))
export const setIsSyncing = createAction(SET_IS_SYNCING)
export const setExpenseTag = createAction(SET_EXPENSE_TAG, (id, isNeeds) => ({
  id,
  isNeeds
}))

export const loadAccount = createAction(LOAD_ACCOUNT)

// ---
// Selectors
// ---
export const isSyncing = state => state.transactions.isSyncing
export const getUntaggedExpenses = state => {
  const expenses = state.transactions.expenses
  return _(expenses)
    .filter(expense => !expense.reviewed)
    .value()
}

export const getNeeds = state => {
  return _(state.transactions.expenses)
    .filter(x => x.is_needs)
    .value()
}

export const getWants = state => {
  return _(state.transactions.expenses)
    .filter(x => !x.is_needs)
    .value()
}

// ---
// Reducer
// ---
const initialState = {
  isSyncing: false,

  expenses: [
    {
      id: 1,
      created_at: '2013-02-27 09:30:26',
      place: 'АЗС Лукойл 101',
      amount: -1500.3,
      is_needs: true,
      reviewed: false
    },
    {
      id: 2,
      created_at: '2013-02-27 09:30:26',
      place: 'Пяторочка',
      amount: -1500.3,
      is_needs: true,
      reviewed: false
    },
    {
      id: 2,
      created_at: '2013-02-27 09:30:26',
      place: 'Пяторочка',
      amount: -1500.3,
      is_needs: false,
      reviewed: true
    }
  ]
}

const reducer = handleActions(
  {
    [LOAD_ACCOUNT]: (state, action) => ({
      ...state,
      ...action.payload
    }),

    [SET_IS_SYNCING]: (state, action) => ({
      ...state,
      isSyncing: action.payload
    }),

    [SET_EXPENSE_TAG]: (state, action) => ({
      ...state,
      expenses: state.expenses.map(exp => {
        if (exp.id !== action.payload.id) {
          return exp
        }

        return {
          ...exp,
          reviewed: true,
          is_needs: action.payload.isNeeds
        }
      })
    })
  },
  initialState
)

export default reducer
