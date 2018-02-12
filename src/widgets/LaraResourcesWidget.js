import React, { Component } from 'react'
import { connect } from 'react-redux'
import reducers from '../reducers/search'
import * as actions from '../actions'

const doLaraSearch = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch('http://localhost:3000/resources?per_page=10&contains=' + searchParams.query, {})
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  })  
}

// Components 
class LaraWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ('data' in this.props.data) {
      let { data } = this.props.data
      const items = data.map((record, index) => 
        <LaraItem key={ record.id } record={ record } index= { index }/>
      )
      return (
        <div id='catalyst-result'>
          <h2>Databases</h2>
          <span>Total found: </span>
          { items }
        </div>
      )
    } else {
      return (<div><h3>Lara Resources results will be here</h3></div>)
    }
  }
}

const LaraItem = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <span>{ record.attributes.name }</span>
    </h4>
    <p>{ record.attributes.description }</p>
  </div>
)    

const mapStateToProps = (state) => {
  const { data } = state
  return { data }
}

export default connect(mapStateToProps)(LaraWidget)
export { doLaraSearch }
