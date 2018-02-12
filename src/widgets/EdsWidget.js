import React, { Component } from 'react'
import { connect } from 'react-redux'

const searchEds = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch(`http://localhost:3000/gateway/eds?q=${ searchParams.query }`, {})
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
      <span className='types'>{ record.eds_languages ? record.eds_languages.join(', ') + ', ' : ''}{ record.eds_publication_year }</span>
    </h4>
  </div>  
)

const mapStateToProps = ({ data }) => ({ data })

export default connect(mapStateToProps)(EdsWidget)
export { searchEds }