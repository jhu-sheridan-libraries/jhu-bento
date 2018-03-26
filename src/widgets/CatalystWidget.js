import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'

// Async Search
const searchCatalyst = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      let params = Object.assign({ wt: "json" }, searchParams.highlightParams);
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
      let solrSearchUrl = `${ process.env.CATALYST_SOLR }/select`
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

const CatalystItem = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <a href={`${ process.env.CATALYST_URL }/${ record.id }`}>{ record.title_display }</a>&nbsp;&nbsp;
      <span className='types'>{ record.format.join(', ') }</span>&nbsp;
      <span>{ record.pub_date }</span>
    </h4>
  </div>  
)

const mapStateToProps = ({ data }) => {
  let initProps = {
    id: 'catalyst-bento',
    title: 'Catalyst'
  }
  if ('response' in data) {
    let { docs, numFound, start } = data.response
    const items = docs.map((record, index) => 
      <CatalystItem key={ record.id } record={ record } index= { index+start }/>
    )
    return {
      ...initProps,
      numFound,
      items,
      url: `${ process.env.CATALYST_URL }?search_field=all_fields&q=`
    }
  } else {
    return initProps
  }
}

export default connect(mapStateToProps)(Widget)
export { searchCatalyst }