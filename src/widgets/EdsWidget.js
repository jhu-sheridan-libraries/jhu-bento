import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getApiSearchPromise } from '../selectors';

const searchEds = (searchParams) => {
  let url = `${ process.env.EDS_API }?q=${ searchParams.query }`
  return getApiSearchPromise(searchParams, url)
}

const EdsItemPresenter = ({ record, index }) => {
  let authors
  if (record['eds_authors'].length > 0) {
    authors = record['eds_authors'][0]
    if (record['eds_authors'].length > 1) {
      authors += ' et al'
    }
  } 
  return (
    <div  className='item'>
      <span className='itemTitle'><a href={ record.eds_plink }>{ record.eds_title }</a></span>
      { record['eds_authors'].length > 0 ? <span className='itemAuthor'>{ authors }, </span> : '' }
      { record['eds_source_title'] ? <span className='itemSource'>{ record['eds_source_title'] }. </span> : '' }
      { record['eds_publication_year'] ? <span className='itemPubdate'>{ record['eds_publication_year'] }</span> : '' }  
    </div>
  )
}

const mapStateToProps = ({ data, isFetching }) => {
  let initProps = {
    id: 'eds-bento',
    title: 'Results from EBSCO',
    description: 'Articles and more with a Humanities focus'
  }
  if ('results' in data) {
    let { results, records } = data
    const items = records.slice(0, 5).map((record, index) =>
      <EdsItemPresenter key={ record.id } record={ record } index= { index }/>
    )
    return {
      ...initProps,
      numFound: results.SearchResult.Statistics.TotalHits,
      items,
      linkOut: 'https://www.ncbi.nlm.nih.gov/pubmed/?term=' + data['query'] ,
      isFetching,
    }
  } else {
    return { ...initProps, isFetching }
  }
}

export default connect(mapStateToProps)(Widget)
export { searchEds }
