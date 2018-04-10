import { namespaced } from 'redux-subspace'
import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'
import searchReducers from './search'
import widgets from '../widgets'

const initialState = Immutable({
  query: ''
})

export const bentoReducer = handleActions({
  [actions.search]: (state, { payload }) => ({
    ...state, query: payload.query
  })
}, initialState)

// Create namespaced reducers for each widget
const reducers = Object.keys(widgets).reduce((acc, key) => {
  acc[key] = namespaced(key)(searchReducers)
  return acc
}, {})

export default reducers