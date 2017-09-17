import { createAction, handleActions } from 'redux-actions'

// ---
// Constants
// ---
export const SET_TOKEN = 'SESSION/SET_TOKEN'
export const SET_LOADING = 'SESSION/SET_LOADING'
export const AUTHORIZE_APPLICATION = 'SESSION/AUTHORIZE_APPLICATION'

// ---
// Action creators
// ---
export const setToken = createAction(SET_TOKEN, token => ({ token }))
export const setLoading = createAction(SET_LOADING, isLoading => ({
  isLoading
}))
export const authorizeApplication = createAction(AUTHORIZE_APPLICATION)

// ---
// Selectors
// ---
export const isLoggedIn = state =>
  !!state.session.token && !state.session.isLoading
export const getSessionToken = state => state.session.token

// ---
// Reducer
// ---
const initialState = {
  token: null,
  isLoading: false
}

const reducer = handleActions(
  {
    [SET_TOKEN]: (state, action) => ({
      ...state,
      token: action.payload.token
    }),

    [SET_LOADING]: (state, action) => ({
      ...state,
      isLoading: action.payload.isLoading
    })
  },
  initialState
)

export default reducer
