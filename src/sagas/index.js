import { all, takeLatest, fork, call, put } from 'redux-saga/effects'
import { namespacedAction } from 'redux-subspace'
import 'regenerator-runtime/runtime'
import { searchLara } from '../widgets/LaraResourcesWidget'
import { searchCatalyst } from '../widgets/CatalystWidget'
import { searchArchivesSpace } from '../widgets/ArchivesSpaceWidget'
import { searchEds } from '../widgets/EdsWidget'
import { searchScopus } from '../widgets/ScopusWidget'
import { searchLibAnswers } from '../widgets/LibAnswersWidget'
import * as actions from '../actions'
import qs from 'query-string'
import { push } from 'react-router-redux'

// A saga to does the search 
function* search(namespace, doSearch, action) {
  let value
  if (action.type == '@@router/LOCATION_CHANGE') {
    let queryParams = qs.parse(action.payload.search)
    value = { query: queryParams.q }
  } else {
    value = action.payload
  }
  try {
    const response = yield call(doSearch, value)    
    yield put(namespacedAction(namespace)(actions.searchSuccess(response)))
  } catch (e) {
    yield put(namespacedAction(namespace)(actions.searchFailure(value)))
  }
}

function* history({ payload: searchParams }) {
  let searchString = qs.stringify({ q: searchParams.query })
  yield put(push({ search: searchString }))
}

function* sagas() {
  yield all([
    fork(takeLatest, 'SEARCH_BEGIN', history),
    fork(takeLatest, 'SEARCH_BEGIN', search, 'lara', searchLara),
    fork(takeLatest, 'SEARCH_BEGIN', search, 'catalyst', searchCatalyst),
    fork(takeLatest, 'SEARCH_BEGIN', search, 'aspace', searchArchivesSpace),
    fork(takeLatest, 'SEARCH_BEGIN', search, 'eds', searchEds),
    fork(takeLatest, 'SEARCH_BEGIN', search, 'scopus', searchScopus),
    fork(takeLatest, 'SEARCH_BEGIN', search, 'libAnswers', searchLibAnswers),
    fork(takeLatest, '@@router/LOCATION_CHANGE', search, 'lara', searchLara),
    fork(takeLatest, '@@router/LOCATION_CHANGE', search, 'catalyst', searchCatalyst),
    fork(takeLatest, '@@router/LOCATION_CHANGE', search, 'aspace', searchArchivesSpace),
    fork(takeLatest, '@@router/LOCATION_CHANGE', search, 'eds', searchEds),
    fork(takeLatest, '@@router/LOCATION_CHANGE', search, 'scopus', searchScopus),
    fork(takeLatest, '@@router/LOCATION_CHANGE', search, 'libAnswers', searchLibAnswers),
  ])
}

export default sagas