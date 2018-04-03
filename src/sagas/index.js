import { all, takeLatest, fork, call, put } from 'redux-saga/effects'
import { namespacedAction } from 'redux-subspace'
import 'regenerator-runtime/runtime'
import qs from 'query-string'
import { push, LOCATION_CHANGE } from 'react-router-redux'
import widgets from '../widgets'
import * as actions from '../actions'
import { BENTO_SEARCH_BEGIN } from '../actions/constants'

// A saga to do the search 
function* search(namespace, doSearch, action) {
  let value
  if (action.type == LOCATION_CHANGE) {
    let queryParams = qs.parse(action.payload.search)
    value = { query: queryParams.q }
  } else {
    value = action.payload
  }
  try {
    const response = yield call(doSearch, value)    
    yield put(namespacedAction(namespace)(actions.finishSearch(response)))
  } catch (e) {
    yield put(namespacedAction(namespace)(actions.failSearch(value)))
  }
}

function* history({ payload: searchParams }) {
  let searchString = qs.stringify({ q: searchParams.query })
  yield put(push({ search: searchString }))
}

function* sagas() {
  const forks = Object.keys(widgets).reduce((acc, key) => acc.concat([
    fork(takeLatest, BENTO_SEARCH_BEGIN, search, key, widgets[key].search),
    fork(takeLatest, LOCATION_CHANGE, search, key, widgets[key].search)
  ]), [fork(takeLatest, BENTO_SEARCH_BEGIN, history)])
  yield all(forks)
}

export default sagas