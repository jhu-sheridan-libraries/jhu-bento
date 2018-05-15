import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getApiSearchPromise } from '../selectors';

const searchArchivesSpace = (searchParams) => {
  let url = `${ process.env.ARCHIVESSPACE_API }?q=${ searchParams.query }`
  return getApiSearchPromise(searchParams, url)
}

const ArchiveSpaceItemPresenter = ({ record, index }) => (
  <div className='item'>
      <a href={ process.env.ARCHIVESSPACE_URL + record.uri }>
        <div className='itemTitle' >
          { record.title }
        </div>
        <span className='types'>{ record.level }, { record.child_container_u_sstr }</span>
      </a>
  </div>
)

const mapStateToProps = ({ data, isFetching }) => {
  let initProps = {
    id: 'archivesspace-bento',
    title: 'ArchivesSpace',
    description: 'Archives and manuscripts at JHU'
  }
  if ('results' in data) {
    let { results, total_hits } = data
    const items = results.slice(0, 5).map((record, index) =>
      <ArchiveSpaceItemPresenter key={ record.id } record={ record } index= { index }/>
    )
    return {
      ...initProps,
      numFound: total_hits,
      items,
      isFetching,
    }
  } else {
    return { ...initProps, isFetching }
  }
}

export default connect(mapStateToProps)(Widget)
export { searchArchivesSpace }
