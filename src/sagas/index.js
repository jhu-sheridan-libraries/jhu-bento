import { all, takeLatest, fork, call, put } from 'redux-saga/effects'
import { namespacedAction } from 'redux-subspace'
import 'regenerator-runtime/runtime'
import qs from 'query-string'
import { push, LOCATION_CHANGE } from 'react-router-redux'
import widgets from '../widgets'
import * as actions from '../actions'
import { BENTO_SEARCH } from '../actions/constants'

// A saga to do the search 
function* search(namespace, callApi, action) {
  let value
  if (action.type == LOCATION_CHANGE) {
    let queryParams = qs.parse(action.payload.search)
    value = { query: queryParams.q }
  } else if (action.type == BENTO_SEARCH) {
    value = action.payload
  } else {
    // TODO: yield an error
  }
  yield put(namespacedAction(namespace)(actions.beginSearch(value)))  
  try {
    const response = yield call(callApi, value)    
    yield put(namespacedAction(namespace)(actions.finishSearch(response)))
  } catch (e) {
    yield put(namespacedAction(namespace)(actions.failSearch(value)))
  }
}

//** Push to history in react router */
function* history({ payload: searchParams }) {
  let searchString = qs.stringify({ q: searchParams.query })
  yield put(push({ search: searchString }))
}

function* sagas() {
  // Create a pair of forked sagas for each widget:  
  // One fork is for user inititiated search; 
  // The other is for starting search by changing the browser location
  const forks = Object.keys(widgets).reduce((acc, key) => acc.concat([
    fork(takeLatest, BENTO_SEARCH, search, key, widgets[key].api),
    fork(takeLatest, LOCATION_CHANGE, search, key, widgets[key].api)
  ]), [fork(takeLatest, BENTO_SEARCH, history)])
  yield all(forks)
}

export default sagas