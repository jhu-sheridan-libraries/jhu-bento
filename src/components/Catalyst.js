import React, { Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'
import CatalystRecord from './CatalystRecord'

const mapStateToProps = (state) => {
  const { data } = state.catalyst
  return { data }
}

// A component that searches Catalyst Solr
class Catalyst extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ('response' in this.props.data) {
      let { docs, numFound, start } = this.props.data.response
      const listItems = docs.map((record, index) => 
        <CatalystRecord key={ record.id } record={ record } index= { index+start }/>
      )
      return (
        <div id='catalyst-result'>
          <h2>Catalyst</h2>
          <span>Total found: { numFound }</span>
          { listItems }
        </div>
      )
    } else {
      return (<div><h3>Catalyst results will be here</h3></div>)
    }

  }
}

export default connect(mapStateToProps)(Catalyst)
