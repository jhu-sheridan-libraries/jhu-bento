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
const doSearch2 = (value) => {
  // Mock an AJAX call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({ meta: { total: '3' }, records: [ { id: 1, title: 'title one' }, { id: 2, title: 'title two' }]});
    }, randomDelay())
  })
}

const doSearch = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      let params = Object.assign({wt: "json"}, searchParams.highlightParams);
      let solrParams = {
        offset: searchParams.offset,
        limit: searchParams.limit,
        query: searchParams.query,
        filter: searchParams.filter,
        fields: searchParams.fetchFields, 
        facet: searchParams.facet,
        params
      };
  
      const reqBody = JSON.stringify(solrParams);
  
      // do the search. 'post' is required with a fetch() body. Solr doesn't mind
      let solrSearchUrl = 'http://localhost:18983/solr/catalyst/select' 
      fetch(solrSearchUrl, {
        method: 'post',
        body: reqBody,
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.status + " " + response.statusText;
        }
      })
      .then((response) => {
        console.log('response:', response)
        return resolve(response)
      })
      .catch((error) => {
        return reject(error)
      });
    } else { 
      return reject({error: 'emtpy search params'})
    }
  })  
}

// function* saga() {
//   yield takeEvery('BENTO_SEARCH_BEGIN', searchSolr)
// }

export default searchSolr