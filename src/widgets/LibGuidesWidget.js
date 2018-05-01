import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getSolrSearchPromise } from '../selectors'

const searchLibGuides = (searchParams) => {
  let url = `${ process.env.LIBGUIDES_SOLR }/select`
  let query = `content:${ searchParams.query } AND id:*guides*`
  let lgSearchParams = { ...searchParams, query }
  return getSolrSearchPromise(lgSearchParams, url)
}

const LibGuidesItem = ({ record, index }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ record.url }>{ record.title }</a></span>
  </div>
)

const mapStateToProps = ({ data, isFetching }) => {
  let initProps = {
    id: 'lib_guides-bento',
    title: 'Guides by Subject',
    description: 'Research tools and resources recommended by librarians'
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
