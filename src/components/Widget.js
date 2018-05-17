import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Widget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let body = this.props.numFound > 0 ? this.props.items : ''
    return (
      <div id={ this.props.id } className='bento-box'>
        <div className='bento-box-header'>
          <h3>{ this.props.title }</h3>
          <p className='description'>{ this.props.description }</p>
        </div>
        { this.props.numFound >= 0 && <div className='count'>{ this.props.numFound.toLocaleString('en') } Results</div> }
        <div className='bento-content'>
          { this.props.isFetching?
              <div className='loading'>Loading...</div> :
              body }
        </div>
        { this.props.numFound > 0 &&
          <div className='more-results'>
            <a href={ this.props.linkOut } target='_more'>Explore More Results</a>
          </div> }
      </div>
    )
  }
}

Widget.defaultProps = {
  numFound: -1,
  isFetching: false
}

Widget.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.array,
  numFound: PropTypes.number,
  linkOut: PropTypes.string,
  isFetching: PropTypes.bool,
}

export default Widget
