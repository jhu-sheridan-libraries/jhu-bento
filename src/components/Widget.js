import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Widget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.numFound < 0) {  
      return (
        <div id={ this.props.id } className='bento-box'>
          <h3>{ this.props.title }</h3>
          <div>Please submit a search</div>
        </div>
      )
    } else {
      return (
        <div id={ this.props.id } className='bento-box'>
          <div className='bento-box-header' style={{ cursor: 'pointer' }}>
            <h3><a href={ this.props.url }>{ this.props.title }</a></h3>
            <span className='count'><a href={ this.props.url }>{ this.props.numFound.toLocaleString('en') }</a></span>
          </div>
          <div className='bento-content'>
            { this.props.items.length ? this.props.items : 'No results found' }
          </div>
        </div>
      )
    }
  }
}

Widget.defaultProps = {
  numFound: -1
}

Widget.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.array,
  numFound: PropTypes.number,
  url: PropTypes.string
}

export default Widget