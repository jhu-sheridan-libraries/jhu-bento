import React, { Component } from 'react'
import { connect } from 'react-redux'

// Async Search
const searchCatalyst = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      let params = Object.assign({wt: "json"}, searchParams.highlightParams);
      let solrParams = {
        offset: searchParams.offset,
        limit: searchParams.limit,
        query: searchParams.query,
        filter: searchParams.filter,
        fields: searchParams.fetchFields, 
        facet: searchParams.facet,
        params
      };
  
      const reqBody = JSON.stringify(solrParams);
  
      // do the search. 'post' is required with a fetch() body. Solr doesn't mind
      let solrSearchUrl = 'http://localhost:18983/solr/catalyst/select' 
      fetch(solrSearchUrl, {
        method: 'post',
        body: reqBody,
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.status + " " + response.statusText;
        }
      })
      .then((response) => {
        return resolve(response)
      })
      .catch((error) => {
        return reject(error)
      });
    } else { 
      return reject({error: 'emtpy search params'})
    }
  })  
}

class CatalystWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ('response' in this.props.data) {
      let { docs, numFound, start } = this.props.data.response
      let Presenter = this.props.data.presenter || 'CatalystItem'
      const items = docs.map((record, index) => 
        <CatalystItem key={ record.id } record={ record } index= { index+start }/>
      )
      return (
        <div id={ this.props.id }>
          <h2>Catalyst</h2>
          <span>Total found: { numFound }</span>
          { items }
        </div>
      )
    } else {
      return (<div>Solr results will be here</div>)
    }
  }
}

const CatalystItem = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <a href={`https://catalyst.library.jhu.edu/catalog/${ record.id }`}>{ record.title_display }</a>&nbsp;&nbsp;
      <span className='types'>{ record.format.join(', ') }</span>
    </h4>
    <span>{ record.pub_date }</span>
  </div>  
)

const mapStateToProps = ({ data }) => ({ data })

export default connect(mapStateToProps)(CatalystWidget)
export { searchCatalyst }