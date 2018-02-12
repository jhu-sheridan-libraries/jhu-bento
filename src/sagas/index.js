import { all, takeLatest, fork, call, put } from 'redux-saga/effects'
import { namespacedAction } from 'redux-subspace'
import 'regenerator-runtime/runtime'
import { searchLara } from '../widgets/LaraResourcesWidget'
import { searchCatalyst } from '../widgets/CatalystWidget'
import { searchArchivesSpace } from '../widgets/ArchivesSpaceWidget'
import { searchEds } from '../widgets/EdsWidget'
import * as actions from '../actions'

// A saga to does the search 
function* search(namespace, doSearch, { payload: value }) {
  try {
    const response = yield call(doSearch, value)
    yield put(namespacedAction(namespace)(actions.searchSuccess(response)))
  } catch (e) {
    yield put(namespacedAction(namespace)(actions.searchFailure(value)))
  }
}

function* sagas() {
  yield all([
    fork(takeLatest, 'SEARCH_BEGIN', search, 'lara', searchLara),
    fork(takeLatest, 'SEARCH_BEGIN', search, 'catalyst', searchCatalyst),
    fork(takeLatest, 'SEARCH_BEGIN', search, 'aspace', searchArchivesSpace),
    fork(takeLatest, 'SEARCH_BEGIN', search, 'eds', searchEds)
  ])
}

export default sagas
