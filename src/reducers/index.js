import { namespaced } from 'redux-subspace'
import Immutable from 'seamless-immutable'
import { handleActions } from 'redux-actions'
import * as actions from '../actions'
import searchReducers from './search'

const initialState = Immutable({
  query: ''
})

const bentoReducers = handleActions({
  [actions.searchBegin]: (state, { payload }) => ({
    ...state, query: payload.query
  })
}, initialState)

const reducers = {
  bento: bentoReducers,
  lara: namespaced('lara')(searchReducers),
  catalyst: namespaced('catalyst')(searchReducers),
  aspace: namespaced('aspace')(searchReducers),
  eds: namespaced('eds')(searchReducers),
  scopus: namespaced('scopus')(searchReducers),
  libAnswers: namespaced('libAnswers')(searchReducers),
}
export default reducers