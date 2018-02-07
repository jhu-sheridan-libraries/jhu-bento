import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'

const initialState = Immutable({
  data: {},
  isLoading: false
})

const reducer = handleActions({
  SEARCH_LARA_RESOURCES_SUCCESS: (state, { payload }) => ({ ...state, data: payload, isLoading: false }),
  SEARCH_LARA_RESOURCES_FAILURE: (state) => ({ ...state, isLoading: false })
}, initialState)

export default reducer