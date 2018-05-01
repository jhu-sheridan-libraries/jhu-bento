import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getApiSearchPromise } from '../selectors';

const searchScopus = (searchParams) => {
  let url = `${ process.env.SCOPUS_API }?q=${ searchParams.query }`
  return getApiSearchPromise(searchParams, url)
}

const ScopusItemPresenter = ({ record, index }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ selectUrl(record) }>{ record['dc:title'] }</a></span>
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

const mapStateToProps = ({ data, isFetching }) => {
  let initProps = {
    id: 'scopus-bento',
    title: 'Results from SCOPUS',
    description: 'Articles and more with a Sciences focus'
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
      linkOut: '',
      isFetching,
    }
  } else {
    return { ...initProps, isFetching }
  }
}

export default connect(mapStateToProps)(Widget)
export { searchScopus }
