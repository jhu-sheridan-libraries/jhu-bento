import { handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'
import * as actions from '../actions'
import { combineReducers } from 'redux'

const initialState = Immutable({
  data: {}, 
  isFetching: false
})

const searchReducers = handleActions({
  [actions.beginSearch]: (state, { payload }) => ({
    ...state, data: payload, isFetching: true
  }),
  [actions.finishSearch]: (state, { payload }) => ({ 
    ...state, data: payload, isFetching: false
  }),
  [actions.failSearch]: (state, { payload }) => ({
    ...state, error: payload, isFetching: false
  })
}, initialState)

export default searchReducers