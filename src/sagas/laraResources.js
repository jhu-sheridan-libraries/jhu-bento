import 'regenerator-runtime/runtime'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as Actions from '../actions/laraResources'

function* searchLaraResources({ payload: value }) {
  console.log(value)
  try {
    const response = yield call(doSearch, value)
    console.log(response)
    yield put(Actions.searchLaraResourcesSuccess(response))
  } catch (e) {
    yield put(Actions.searchLaraResourcesFailure(value))
  }
}

const doSearch = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch('http://localhost:3000/resources?contains=' + searchParams.query, {})
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  })  
}

// function* saga() {
//   yield takeEvery('BENTO_SEARCH_BEGIN', searchLaraResources)
// }

export default searchLaraResources