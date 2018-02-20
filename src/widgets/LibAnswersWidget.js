import React, { Component } from 'react'
import { connect } from 'react-redux'

const searchLibAnswers = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch(`http://localhost:3000/gateway/lib_answers?q=${ searchParams.query }`, {})
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  })  
}

class LibAnswersWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ('search' in this.props.data) {
      let { numFound, results } = this.props.data.search
      const items = results.map((record, index) => 
        <LibAnswersItemPresenter key={ record.id } record={ record } index= { index }/>
      )
      return (
        <div id={ this.props.id }>
          <h2>Archives Space</h2>
          <span>Total found: { numFound }</span>
          { items }
        </div>
      )
    } else {
      return (<div>Lib Answers results will be here</div>)
    }
  }
}

const LibAnswersItemPresenter = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <a href={ record.url }>{ record.question }</a>&nbsp;&nbsp;
      <span className='types'>{ record.topics.join(', ') }</span>
    </h4>
  </div>  
)

const mapStateToProps = ({ data }) => ({ data })

export default connect(mapStateToProps)(LibAnswersWidget)
export { searchLibAnswers }