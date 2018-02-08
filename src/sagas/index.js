import { all, takeLatest, fork } from 'redux-saga/effects'
import { searchLara } from '../widgets/LaraResourcesWidget'
import { searchSolr } from '../widgets/SolrWidget'

function* sagas() {
  yield all([
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchSolr),
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchLara)
  ])
}

export default sagas
