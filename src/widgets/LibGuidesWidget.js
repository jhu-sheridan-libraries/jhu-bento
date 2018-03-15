import React, { Component } from 'react'
import { connect } from 'react-redux'

// Async Search
const searchLibGuides = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      let params = Object.assign({wt: "json"}, searchParams.highlightParams);
      let solrParams = {
        offset: searchParams.offset,
        limit: searchParams.limit,
        query: `content:${searchParams.query} AND id:*guides*`,
        filter: searchParams.filter,
        fields: searchParams.fetchFields, 
        facet: searchParams.facet,
        params
      };
  
      const reqBody = JSON.stringify(solrParams);
  
      // do the search. 'post' is required with a fetch() body. Solr doesn't mind
      let solrSearchUrl = 'http://10.161.51.48:8983/solr/nutch/select' 
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

class LibGuidesWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ('response' in this.props.data) {
      let { docs, numFound, start } = this.props.data.response
      let Presenter = this.props.data.presenter || 'LibGuidesItem'
      const items = docs.map((record, index) => 
        <LibGuidesItem key={ record.id } record={ record } index= { index+start }/>
      )
      return (
        <div id={ this.props.id } className='bento-box catalog'>
          <div className='bento-box-header' style={{ cursor: 'pointer' }}>
            <h3>LibGuides</h3>
            <span className="count">{ numFound }</span>
          </div>
          <div className='bento-content'>
            { items }
          </div>
        </div>
      )
    } else {
      return (
        <div id={ this.props.id } className='bento-box catalog'>
          <h3>LibGuides</h3>
          <div>LibGuides results will be here</div>
        </div>
      )
    }
  }
}

const LibGuidesItem = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <a href={ record.url }>{ record.title }</a>&nbsp;&nbsp;
    </h4>
  </div>  
)

const mapStateToProps = ({ data }) => ({ data })

export default connect(mapStateToProps)(LibGuidesWidget)
export { searchLibGuides }