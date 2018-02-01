import 'regenerator-runtime/runtime'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as Actions from '../actions/catalyst'

function* searchSolr({ payload: value }) {
  try {
    const response = yield call(doSearch, value)
    console.log(response)
    yield put(Actions.searchCatalystSuccess(response))
  } catch (e) {
    yield put(Actions.searchCatalystFailure(value))
  }
}

const randomDelay = () => 300 + Math.random() * 1000;
const doSearch = (value) => {
  // Mock an AJAX call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({ meta: { total: '3' }, records: [ { title: 'title one' }, { title: 'title two' }]});
    }, randomDelay())
  })
}

function* saga() {
  yield takeLatest('SEARCH_CATALYST_BEGIN', searchSolr)
}

export default saga