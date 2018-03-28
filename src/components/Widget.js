import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Widget extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let title = (<h3>{ this.props.title }</h3>)
    let counter = ''
    let content = 'Please submit a search'
    if (this.props.numFound >= 0) {  
      title = (<h3><a href={ this.props.url }>{ this.props.title }</a></h3>)
      counter = (<span className='count'><a href={ this.props.url }>{ this.props.numFound.toLocaleString('en') }</a></span>)
      content = this.props.items.length ? this.props.items : 'No results found'
    }
    return (
      <div id={ this.props.id } className='bento-box'>
        <div className='bento-box-header'>
          { title } 
          { counter }
        </div>
        <div className='bento-content'>
          { content }
        </div>
      </div>
    )
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