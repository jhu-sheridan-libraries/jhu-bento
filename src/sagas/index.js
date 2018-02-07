import { all, takeLatest, fork } from 'redux-saga/effects'
import searchCatalyst from './catalyst'
import searchLaraResources from './laraResources'

function* sagas() {
  yield all([
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchCatalyst),
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchLaraResources)
  ])
}

export default sagas
