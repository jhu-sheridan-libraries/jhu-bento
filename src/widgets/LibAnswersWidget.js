import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'

const searchLibAnswers = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch(`${ process.env.LIBANSWERS_API }?q=${ searchParams.query }`, {})
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  })  
}

const LibAnswersItem = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <a href={ record.url }>{ record.question }</a>&nbsp;&nbsp;
      <span className='types'>{ record.topics.join(', ') }</span>
    </h4>
  </div>  
)

const mapStateToProps = ({ data }) => {
  let initProps = {
    id: 'lib_answers-bento',
    title: 'LibAnswers',
  }
  if ('search' in data) {
    let { numFound, results } = data.search
    const items = results.slice(0, 10).map((record, index) => 
      <LibAnswersItem key={ record.id } record={ record } index= { index }/>
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
export { searchLibAnswers }