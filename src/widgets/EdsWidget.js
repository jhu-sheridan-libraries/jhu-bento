import React, { Component } from 'react'
import Immutable from 'seamless-immutable'
import { createActions, handleActions } from 'redux-actions'
import 'regenerator-runtime/runtime'
import { call, put } from 'redux-saga/effects'
import { connect } from 'react-redux'

// actions
const actions = createActions({
  EDS: {
    SEARCH_SUCCESS: data => data, // searchSuccess
    SEARCH_FAILURE: error => error  // searchFailure
  }
})

// reducers
const initialState = Immutable({
  data: {}, 
  isLoading: false
})

const edsWidgetReducers = handleActions({
  [actions.eds.searchSuccess](state, { payload }) { 
    return {...state, data: payload, isLoading: false} 
  },
  [actions.eds.searchFailure](state, { payload }) {
    return { ...state, error: payload, isLoading: false}
  }
}, initialState)

// sagas
function* searchEds({ payload: value }) {
  try {
    const response = yield call(doSearch, value)
    console.log(response)
    yield put(actions.eds.searchSuccess(response))
  } catch (e) {
    yield put(actions.eds.searchFailure(value))
  }
}

const doSearch = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch('http://localhost:3000/gateway/eds?q=test', {})
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  })  
}

class EdsWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ('results' in this.props.data) {
      let { results, records } = this.props.data
      const items = records.map((record, index) => 
        <EdsItemPresenter key={ record.id } record={ record } index= { index }/>
      )
      return (
        <div id={ this.props.id }>
          <h2>EBSCO</h2>
          <span>Total found: { results.SearchResult.Statistics.TotalHits }</span>
          { items }
        </div>
      )
    } else {
      return (<div>EBSCO results will be here</div>)
    }
  }
}

const EdsItemPresenter = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <a href={ record.eds_plink }>{ record.eds_title }</a>&nbsp;&nbsp;
      <span className='types'>{ record.eds_languages.join(', ') }, { record.eds_publication_year }</span>
    </h4>
  </div>  
)

const mapStateToProps = (state) => {
  const { data } = state.edsWidgetReducers
  return { data }
}

export default connect(mapStateToProps)(EdsWidget)
export { edsWidgetReducers, searchEds }