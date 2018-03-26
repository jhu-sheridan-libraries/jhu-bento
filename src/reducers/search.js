import { handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'
import * as actions from '../actions'
import { combineReducers } from 'redux'

const initialState = Immutable({
  data: {}, 
  isLoading: false
})

const searchReducers = handleActions({
  [actions.finishSearch]: (state, { payload }) => ({ 
    ...state, data: payload, isLoading: false
  }),
  [actions.failSearch]: (state, { payload }) => ({
    ...state, error: payload, isLoading: false
  })
}, initialState)

export default searchReducers