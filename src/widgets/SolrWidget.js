import React, { Component } from 'react'
import Immutable from 'seamless-immutable'
import { createActions, handleActions } from 'redux-actions'
import 'regenerator-runtime/runtime'
import { call, put } from 'redux-saga/effects'
import { connect } from 'react-redux'

// actions
const actions = createActions({
  SOLR: {
    SEARCH_SUCCESS: data => data, // searchSuccess
    SEARCH_FAILURE: error => error  // searchFailure
  }
})

// reducers
const initialState = Immutable({
  data: {}, 
  isLoading: false
})

const solrWidgetReducers = handleActions({
  [actions.solr.searchSuccess](state, { payload }) { 
    return {...state, data: payload, isLoading: false} 
  },
  [actions.solr.searchFailure](state, { payload }) {
    return { ...state, error: payload, isLoading: false}
  }
}, initialState)

// sagas
function* searchSolr({ payload: value }) {
  try {
    const response = yield call(doSearch, value)
    console.log(response)
    yield put(actions.solr.searchSuccess(response))
  } catch (e) {
    yield put(actions.solr.searchFailure(value))
  }
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

class SolrWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('response')
    if ('response' in this.props.data) {
      let { docs, numFound, start } = this.props.data.response
      let Presenter = this.props.data.presenter || 'SolrItemPresenter'
      const items = docs.map((record, index) => 
        <SolrItemPresenter key={ record.id } record={ record } index= { index+start }/>
      )
      return (
        <div id={ this.props.id }>
          <h2>Catalyst</h2>
          <span>Total found: { numFound }</span>
          { items }
        </div>
      )
    } else {
      return (<div>Solr results will be here</div>)
    }
  }
}

const SolrItemPresenter = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <a href={`https://catalyst.library.jhu.edu/catalog/${ record.id }`}>{ record.title_display }</a>&nbsp;&nbsp;
      <span className='types'>{ record.format.join(', ') }</span>
    </h4>
    <span>{ record.pub_date }</span>
  </div>  
)

const mapStateToProps = (state) => {
  const { data } = state.solrWidgetReducers
  return { data }
}

export default connect(mapStateToProps)(SolrWidget)
export { solrWidgetReducers, searchSolr }