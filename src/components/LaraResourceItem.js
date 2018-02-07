import React, { Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'

// Displays a single Solr Catalyst record
class LaraResourceItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { record, index } = this.props
    return (
      <div>
        <h4>
          <span>{ index + 1 }.</span>&nbsp;&nbsp;
          <span>{ record.attributes.name }</span>
        </h4>
        <p>{ record.attributes.description }</p>
      </div>
    )    
  }
}

export default LaraResourceItem