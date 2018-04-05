import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getApiSearchPromise } from '../selectors'

const searchFindit = (searchParams) => {
  let url = `${ process.env.FINDIT_API }/auto_complete_for_journal_title?utf8=%E2%9C%93&rfr_id=info%3Asid%2Fumlaut.code4lib.org%3Acitation&rft.title=&rft.object_id=&rft.issn=&rft.date=&__year=&__month=&__day=&rft.volume=&rft.issue=&rft.spage=&umlaut.title_search_type=contains&rft.jtitle=${ searchParams.query }`
  return getApiSearchPromise(searchParams, url)
}

const FinditItem = ({ record, index }) => (
  <div className='item'>
      <span className='itemTitle'><a href="">{ record.title }</a></span>
  </div>
)

const mapStateToProps = ({ data }) => {
  let initProps = {
    id: 'findit-bento',
    title: 'Findit',
  }
  // TODO: Update after change of Umlaut API
  if (data instanceof Array) {
    const items = data.slice(0, 5).map((record, index) =>
      <FinditItem key={ record.object_id } record={ record } index= { index }/>
    )
    return {
      ...initProps,
      numFound: data.length, // TODO: Update after Umlaut API change
      items,
      url: ''
    }
  } else {
    return initProps
  }
}

export default connect(mapStateToProps)(Widget)
export { searchFindit }
