import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getSolrSearchPromise } from '../selectors'

const searchLibGuides = (searchParams) => {
  let url = `${ process.env.LIBGUIDES_SOLR }/select`
  if (searchParams.query !== undefined) {
    const query = `content:${ searchParams.query } AND id:*guides*`
    const lgSearchParams = { ...searchParams, query }
    return getSolrSearchPromise(lgSearchParams, url)
  } else {
    return getSolrSearchPromise(searchParams, url)
  }
}

const LibGuidesItem = ({ record, index }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ record.url }>{ record.title }</a></span>
  </div>
)

const mapStateToProps = ({ data, isFetching }) => {
  let initProps = {
    id: 'lib_guides-bento',
    title: 'LibGuides',
  }
  if ('response' in data) {
    let { docs, numFound, start } = data.response
    const items = docs.map((record, index) =>
      <LibGuidesItem key={ record.id } record={ record } index= { index+start }/>
    )
    return {
      ...initProps,
      numFound,
      items,
      linkOut: `${ process.env.LIBGUIDES_URL }?q=${ '' }`,
      isFetching,
    }
  } else {
    return { ...initProps, isFetching } 
  }
}

export default connect(mapStateToProps)(Widget)
export { searchLibGuides }
