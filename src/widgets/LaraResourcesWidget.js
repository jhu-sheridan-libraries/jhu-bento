import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getApiSearchPromise } from '../selectors';

const searchLara = (searchParams) => {
  let url = `${ process.env.LARA_API }?page[size]=10&filter[keyword]=${ searchParams.query }`
  return getApiSearchPromise(searchParams, url)
}

const LaraItem = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <span>{ record.attributes.name }</span>
    </h4>
  </div>
)    

const mapStateToProps = ({ data }) => {
  let initProps = {
    id: 'lara-bento',
    title: 'Databases',
  }
  if ('data' in data) {
    let meta = data.meta, records = data.data
    let start = meta.page_size * (meta.current_page - 1)
    let numFound = meta.total_count
    const items = records.map((record, index) => 
      <LaraItem key={ record.id } record={ record } index= { index + start }/>
    )
    return {
      ...initProps, 
      numFound,
      items,
      url: ''
    } 
  } else {
    return initProps
  }
}

export default connect(mapStateToProps)(Widget)
export { searchLara }
