import React, { Component } from 'react'
import { connect } from 'react-redux'

const searchLara = (searchParams) => {
  return new Promise((resolve, reject) => {
    if (searchParams.query) {
      return fetch('http://localhost:3000/resources?per_page=10&contains=' + searchParams.query, {})
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    } else {
      return reject({error: 'emtpy search params'})
    }
  })  
}

// Components 
class LaraWidget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if ('data' in this.props.data) {
      let { data } = this.props.data
      const items = data.map((record, index) => 
        <LaraItem key={ record.id } record={ record } index= { index }/>
      )
      return (
        <div id={ this.props.id } className='bento-box libAnswers'>
          <div className='bento-box-header' style={{ cursor: 'pointer' }}>
            <h3>Databases</h3>
          </div>
          <div className='bento-content'>
            { items }
          </div>
        </div>
      )
    } else {
      return (
        <div id={ this.props.id } className='bento-box scopus'>
          <div className='bento-box-header' style={{ cursor: 'pointer' }}>
            <h3>Databases</h3>
          </div>
          <div className='bento-content'>
            Databases results will be here
          </div>
        </div>
      )
    }
  }
}

const LaraItem = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <span>{ record.attributes.name }</span>
    </h4>
    {/* <p>{ record.attributes.description }</p> */}
  </div>
)    

const mapStateToProps = ({ data }) => ({ data })

export default connect(mapStateToProps)(LaraWidget)
export { searchLara }
