import { all, takeLatest, fork } from 'redux-saga/effects'
import { searchLara } from '../widgets/LaraResourcesWidget'
import { searchSolr } from '../widgets/SolrWidget'
import { searchArchivesSpace } from '../widgets/ArchivesSpaceWidget'
import { searchEds } from '../widgets/EdsWidget'

function* sagas() {
  yield all([
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchSolr),
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchLara),
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchArchivesSpace),
    fork(takeLatest, 'BENTO_SEARCH_BEGIN', searchEds)
  ])
}

export default sagas
