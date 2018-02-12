import React, { Component } from 'react'
import Immutable from 'seamless-immutable'
import { createActions, handleActions } from 'redux-actions'
import 'regenerator-runtime/runtime'
import { call, put } from 'redux-saga/effects'
import { connect } from 'react-redux'

// actions
const actions = createActions({
  ARCHIVES_SPACE: {
    SEARCH_SUCCESS: data => data, // searchSuccess
    SEARCH_FAILURE: error => error  // searchFailure
  }
})

// reducers
const initialState = Immutable({
  data: {}, 
  isLoading: false
})

const archivesSpaceWidgetReducers = handleActions({
  [actions.archivesSpace.searchSuccess](state, { payload }) { 
    return {...state, data: payload, isLoading: false} 
  },
  [actions.archivesSpace.searchFailure](state, { payload }) {
    return { ...state, error: payload, isLoading: false}
  }
}, initialState)

// sagas
function* searchArchivesSpace({ payload: value }) {
  try {
    const response = yield call(doSearch, value)
    yield put(actions.archivesSpace.searchSuccess(response))
  } catch (e) {
    yield put(actions.archivesSpace.searchFailure(value))
  }
}

const doSearch = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch('http://localhost:3000/gateway/aspace?q=test', {})
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  })  
}

class ArchivesSpaceWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ('results' in this.props.data) {
      let { results, total_hits } = this.props.data
      const items = results.map((record, index) => 
        <ArchiveSpaceItemPresenter key={ record.id } record={ record } index= { index }/>
      )
      return (
        <div id={ this.props.id }>
          <h2>Archives Space</h2>
          <span>Total found: { total_hits }</span>
          { items }
        </div>
      )
    } else {
      return (<div>ArchivesSpace results will be here</div>)
    }
  }
}

const ArchiveSpaceItemPresenter = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <a href={`http://jhepptest.library.jhu.edu:9999${ record.uri }`}>{ record.title }</a>&nbsp;&nbsp;
      <span className='types'>{ record.level }, { record.child_container_u_sstr }</span>
    </h4>
  </div>  
)

const mapStateToProps = (state) => {
  const { data } = state.archivesSpaceWidgetReducers
  return { data }
}

export default connect(mapStateToProps)(ArchivesSpaceWidget)
export { archivesSpaceWidgetReducers, searchArchivesSpace }