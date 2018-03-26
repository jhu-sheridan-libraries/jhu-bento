import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'

const searchArchivesSpace = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch(`${ process.env.ARCHIVESSPACE_API }?q=${ searchParams.query }`, {})
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  })  
}

const ArchiveSpaceItemPresenter = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <a href={ process.env.ARCHIVESSPACE_URL + record.uri }>{ record.title }</a>&nbsp;&nbsp;
      <span className='types'>{ record.level }, { record.child_container_u_sstr }</span>
    </h4>
  </div>  
)

const mapStateToProps = ({ data }) => {
  let initProps = {
    id: 'archivesspace-bento',
    title: 'ArchivesSpace'
  }
  if ('results' in data) {
    let { results, total_hits } = data
    const items = results.map((record, index) => 
      <ArchiveSpaceItemPresenter key={ record.id } record={ record } index= { index }/>
    )
    return {
      ...initProps,
      numFound: total_hits,
      items
    }
  } else {
    return initProps
  }
}

export default connect(mapStateToProps)(Widget)
export { searchArchivesSpace }