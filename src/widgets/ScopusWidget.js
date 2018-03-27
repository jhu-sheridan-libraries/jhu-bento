import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getSearchPromise } from '../selectors';

const searchScopus = (searchParams) => {
  let url = `${ process.env.SCOPUS_API }?q=${ searchParams.query }`
  return getSearchPromise(searchParams, url)
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

const mapStateToProps = ({ data }) => {
  let initProps = {
    id: 'scopus-bento',
    title: 'SCOPUS'
  }
  if ('search-results' in data) {
    let results = data['search-results']
    const items = results.entry.slice(0, 10).map((record, index) => 
      <ScopusItemPresenter key={ record['dc:identifier'] } record={ record } index= { index }/>
    )
    return {
      ...initProps,
      numFound: Number(results['opensearch:totalResults']),
      items,
      url: ''
    }
  } else {
    return initProps
  }
}

export default connect(mapStateToProps)(Widget)
export { searchScopus }