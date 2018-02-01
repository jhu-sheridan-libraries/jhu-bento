import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'

const initialState = Immutable({
  meta: {},
  records: [],
  isLoading: false
})

const reducer = handleActions({
  SEARCH_CATALYST_SUCCESS: (state, { payload: { meta, records } }) => ({ ...state, meta, records, isLoading: false }),
  SEARCH_CATALYST_BEGIN: (state) => ({ ...state, isLoading: true }),
  SEARCH_CATALYST_FAILURE: (state) => ({ ...state, isLoading: false })
}, initialState)

export default reducer