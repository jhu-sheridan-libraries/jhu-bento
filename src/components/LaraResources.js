import React, { Component } from 'react'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'
import LaraResourceItem from './LaraResourceItem'

const mapStateToProps = (state) => {
  const { data } = state.laraResources
  return { data }
}

// A component that searches Catalyst Solr
class LaraResources extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ('data' in this.props.data) {
      let { data } = this.props.data
      const listItems = data.map((record, index) => 
        <LaraResourceItem key={ record.id } record={ record } index= { index }/>
      )
      return (
        <div id='catalyst-result'>
          <h2>Lara Resources</h2>
          <span>Total found: </span>
          { listItems }
        </div>
      )
    } else {
      return (<div><h3>Lara Resources results will be here</h3></div>)
    }

  }
}

export default connect(mapStateToProps)(LaraResources)
