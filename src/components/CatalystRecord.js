import React, { Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'

// Displays a single Solr Catalyst record
class CatalystRecord extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { record, index } = this.props
    return (
      <div>
        <h4>
          <span>{ index + 1 }.</span>&nbsp;&nbsp;
          <a href={`https://catalyst.library.jhu.edu/catalog/${ record.id }`}>{ record.title_display }</a>&nbsp;&nbsp;
          <span className='types'>{ record.format.join(', ') }</span>
        </h4>
        <span>{ record.pub_date }</span>
      </div>
    )    
  }
}

export default CatalystRecord