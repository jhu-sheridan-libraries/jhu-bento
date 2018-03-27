import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getSolrSearchPromise } from '../selectors';

const searchCatalyst = (searchParams) => {
  let url = `${ process.env.CATALYST_SOLR }/select`
  return getSolrSearchPromise(searchParams, searchParams.query, url)
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