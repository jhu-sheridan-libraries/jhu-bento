import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getApiSearchPromise } from '../selectors';

const searchPubmed = (searchParams) => {
  let url = `${ process.env.PUBMED_API }?q=${ searchParams.query }`
  return getApiSearchPromise(searchParams, url)
}

const PubmedItemPresenter = ({ record, index }) => {
  let authors = record['authors'][0]['name']
  if (record['authors'].length > 1) { 
    authors += ' et al, '
  }
  return (
    <div className='item'>
        <span className='itemTitle'><a href={ 'https://www.ncbi.nlm.nih.gov/pubmed/' + record['uid'] } target='_new'>{ record['title'] }</a></span>
        <span className='itemAuthor'>{ authors }</span>
        { record['source'] ? <span className='itemSource'>{ record['source'] }. </span> : '' }     
        { record['pubdate'] ? <span className='itemPubdate'>{ record['pubdate'] }</span>: '' } 
    </div>
  )
}


const mapStateToProps = ({ data, isFetching }) => {
  let initProps = {
    id: 'pubmed-bento',
    title: 'Results from PubMed',
    description: 'Articles and more with a Medicine and Life Sciences focus'
  }
  if ('result' in data) {
    let results = data['result']
    const items = results['uids'].slice(0,5).map((uid, index) =>
      <PubmedItemPresenter key={ uid } record={ results[uid] } index= { index }/>
    )
    return {
      ...initProps,
      numFound: Number(data['num_found']),
      items,
      isFetching,
      linkOut: 'https://www.ncbi.nlm.nih.gov/pubmed/?term=' + data['query'],
    }
  } else {
    return { ...initProps, isFetching }
  }
}

export default connect(mapStateToProps)(Widget)
export { searchPubmed }
