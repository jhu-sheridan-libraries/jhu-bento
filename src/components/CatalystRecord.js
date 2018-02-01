import React, { Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'

// Displays a single Solr Catalyst record
class CatalystRecord extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span>title: { this.props.record.title }</span>
    )    
  }
}

export default CatalystRecord