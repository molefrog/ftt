import { createAction, handleActions } from 'redux-actions'

// ---
// Constants
// ---
export const LOAD_CARDS = 'CARDS/LOAD_CARDS`'

// ---
// Action creators
// --
export const loadCards = createAction(LOAD_CARDS, cards => ({ cards }))

// ---
// Selectors
// ---
export const getCards = state => state.cards.cards

// ---
// Reducer
// ---
const initialState = {
  cards: []
}

const reducer = handleActions(
  {
    [LOAD_CARDS]: (state, action) => ({
      ...state,
      cards: action.payload.cards
    })
  },
  initialState
)

export default reducer
