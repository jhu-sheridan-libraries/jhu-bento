import { handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'
import * as actions from '../actions'
import { combineReducers } from 'redux'

const initialState = Immutable({
  data: {}, 
  isLoading: false
})

const searchReducers = handleActions({
  [actions.searchSuccess]: (state, { payload }) => ({ 
    ...state, data: payload, isLoading: false
  }),
  [actions.searchFailure]: (state, { payload }) => ({
    ...state, error: payload, isLoading: false
  })
}, initialState)

export default searchReducers