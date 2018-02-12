import React, { Component } from 'react'
import { connect } from 'react-redux'

const searchArchivesSpace = (searchParams) => {
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

const mapStateToProps = ({ data }) => ({ data })

export default connect(mapStateToProps)(ArchivesSpaceWidget)
export { searchArchivesSpace }