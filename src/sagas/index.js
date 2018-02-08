import { all, takeLatest, fork } from 'redux-saga/effects'
import searchLaraResources from './laraResources'
import { searchSolr } from '../widgets/SolrWidget'

function* sagas() {
  yield all([
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchLaraResources),
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchSolr)
  ])
}

export default sagas
