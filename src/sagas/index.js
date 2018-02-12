import { all, takeLatest, fork, call, put } from 'redux-saga/effects'
import { doLaraSearch } from '../widgets/LaraResourcesWidget'
import { searchSolr } from '../widgets/SolrWidget'
import { searchArchivesSpace } from '../widgets/ArchivesSpaceWidget'
import { searchEds } from '../widgets/EdsWidget'
import * as actions from '../actions'
import { namespacedAction } from 'redux-subspace'

// A saga to does the search 
function* search(namespace, doSearch, { payload: value }) {
  try {
    const response = yield call(doSearch, value)
    yield put(namespacedAction(namespace)(actions.searchSuccess(response)))
  } catch (e) {
    yield put(actions.searchFailure(value))
  }
}

function* sagas() {
  yield all([
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', search, 'lara', doLaraSearch),
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchSolr),
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchArchivesSpace),
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchEds)
  ])
}

export default sagas
