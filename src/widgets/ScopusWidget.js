import React, { Component } from 'react'
import { connect } from 'react-redux'

const searchScopus = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch(`http://localhost:3000/gateway/scopus?q=${ searchParams.query }`, {})
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  })  
}

class ScopusWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ('search-results' in this.props.data) {
      let results = this.props.data['search-results']
      console.log('results, ', results)
      const items = results.entry.map((record, index) => 
        <ScopusItemPresenter key={ record['dc:identifier'] } record={ record } index= { index }/>
      )
      return (
        <div id={ this.props.id }>
          <h2>SCOPUS</h2>
          <span>Total found: { results['opensearch:totalResults'] }</span>
          { items }
        </div>
      )
    } else {
      return (<div>SCOPUS results will be here</div>)
    }
  }
}

const ScopusItemPresenter = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <a href={ selectUrl(record) }>{ record['dc:title'] }</a>&nbsp;&nbsp;      
    </h4>
  </div>  
)

const selectUrl = (record) => {
  for (let link of record.link) {
    if (link['@ref'] === 'scopus') {
      return link['@href']
    }
  }
  return ''
}

const mapStateToProps = ({ data }) => ({ data })

export default connect(mapStateToProps)(ScopusWidget)
export { searchScopus }