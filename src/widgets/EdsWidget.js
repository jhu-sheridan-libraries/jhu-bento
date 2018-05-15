import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getApiSearchPromise } from '../selectors';

const searchEds = (searchParams) => {
  let url = `${ process.env.EDS_API }?q=${ searchParams.query }`
  return getApiSearchPromise(searchParams, url)
}

const EdsItemPresenter = ({ record, index }) => (
  <div  className='item'>
    <a href={ record.eds_plink }>
      <div className='itemTitle' >
        { record.eds_title }
      </div>
      <span className='types'>{ record.eds_languages ? record.eds_languages.join(', ') + ', ' : ''}{ record.eds_publication_year }</span>
    </a>
  </div>
)

const mapStateToProps = ({ data, isFetching }) => {
  let initProps = {
    id: 'eds-bento',
    title: 'Articles'
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
      linkOut: '',
      isFetching,
    }
  } else {
    return { ...initProps, isFetching }
  }
}

export default connect(mapStateToProps)(Widget)
export { searchEds }
