import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getApiSearchPromise } from '../selectors'
import ent from 'ent'

const searchLibAnswers = (searchParams) => {
  let url = `${ process.env.LIBANSWERS_API }?q=${ searchParams.query }`
  return getApiSearchPromise(searchParams, url)
}

const LibAnswersItem = ({ record, index }) => (
  <div className='item'>
      <span className='itemTitle'><a href={ record.url }>{ record.question }</a></span>
      <span className='types'>{ ent.decode( record.topics.join(', ') ) }</span>
  </div>
)

const mapStateToProps = ({ data, isFetching }) => {
  let initProps = {
    id: 'lib_answers-bento',
    title: 'LibAnswers',
  }
  if ('search' in data) {
    let { numFound, results } = data.search
    const items = results.slice(0, 5).map((record, index) =>
      <LibAnswersItem key={ record.id } record={ record } index= { index }/>
    )
    return {
      ...initProps,
      numFound,
      items,
      linkOut: '',
      isFetching,
    }
  } else {
    return { ...initProps, isFetching }
  }
}

export default connect(mapStateToProps)(Widget)
export { searchLibAnswers }
