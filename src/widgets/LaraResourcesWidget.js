import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getApiSearchPromise } from '../selectors';

const searchLara = (searchParams) => {
  let url = `${ process.env.LARA_API }?page[size]=5&filter[keyword]=${ searchParams.query }`
  return getApiSearchPromise(searchParams, url)
}

const LaraItem = ({ record, index }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ 'http://databases.library.jhu.edu/databases/database/' + record.attributes.jhu_id } target='_new'>{ record.attributes.name }</a></span>
  </div>
)

const mapStateToProps = ({ data, isFetching }) => {
  let initProps = {
    id: 'lara-bento',
    title: 'Databases',
    description: 'Use to find articles, primary sources, data, and more'
  }
  if ('data' in data) {
    let meta = data.meta, records = data.data
    let start = meta.page_size * (meta.current_page - 1)
    let numFound = meta.total_count
    const items = records.slice(0, 5).map((record, index) =>
      <LaraItem key={ record.id } record={ record } index= { index + start }/>
    )
    return {
      ...initProps,
      numFound,
      items,
      linkOut: 'http://databases.library.jhu.edu/?lang=&base=databases&action=find&query=' + meta.filter.keyword,
      isFetching,
    }
  } else {
    return { ...initProps, isFetching }
  }
}

export default connect(mapStateToProps)(Widget)
export { searchLara }
