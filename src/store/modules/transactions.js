import { createAction, handleActions } from 'redux-actions'

// ---
// Constants
// ---
export const SETUP_WITH_CARD = 'TRANSACTIONS/SETUP_WITH_CARD'
export const SET_IS_SYNCING = 'TRANSACTIONS/SET_IS_SYNCING'

// ---
// Action creators
// ---
export const setupWithCard = createAction(SETUP_WITH_CARD, cardId => ({
  cardId
}))
export const setIsSyncing = createAction(SET_IS_SYNCING)

// ---
// Selectors
// ---
export const isSyncing = state => state.transactions.isSyncing

// ---
// Reducer
// ---
const initialState = {
  isSyncing: false
}

const reducer = handleActions(
  {
    [SET_IS_SYNCING]: (state, action) => ({
      ...state,
      isSyncing: action.payload
    })
  },
  initialState
)

export default reducer
