import React, { Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'
import CatalystRecord from './CatalystRecord'

const mapStateToProps = (state) => {
  const { meta, records } = state.catalyst
  return { meta, records }
}

// A component that searches Catalyst Solr
class Catalyst extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const listItems = this.props.records.map((record) => 
      <li key={ record.id }>
        <CatalystRecord record={ record } />
      </li>
    )
    return (
      <div id='catalyst-result'>
        <ul>
          { listItems }
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Catalyst)
