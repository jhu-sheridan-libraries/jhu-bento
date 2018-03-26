import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'

const searchEds = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch(`${ process.env.EDS_API }?q=${ searchParams.query }`, {})
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  })  
}

const EdsItemPresenter = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <a href={ record.eds_plink }>{ record.eds_title }</a>&nbsp;&nbsp;
      <span className='types'>{ record.eds_languages ? record.eds_languages.join(', ') + ', ' : ''}{ record.eds_publication_year }</span>
    </h4>
  </div>  
)

const mapStateToProps = ({ data }) => {
  let initProps = {
    id: 'eds-bento',
    title: 'Articles'
  }
  if ('results' in data) {
    let { results, records } = data
    const items = records.slice(0, 10).map((record, index) => 
      <EdsItemPresenter key={ record.id } record={ record } index= { index }/>
    )
    return {
      ...initProps,
      numFound: results.SearchResult.Statistics.TotalHits,
      items,
      url: ''
    }
  } else {
    return initProps
  }
}

export default connect(mapStateToProps)(Widget)
export { searchEds }