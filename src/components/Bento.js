import React, { Component } from 'react'
import { connect } from 'react-redux'
import { subspaced } from 'react-redux-subspace'
import qs from 'query-string'
import { search } from '../actions'
import widgets from '../widgets'
import '../stylesheets/bento.scss'

const mapStateToProps = (state, ownProps) => {
  let searchTerm = ''
  // maps the query parameter from route to props
  if (ownProps.location.search) {
    let params = qs.parse(ownProps.location.search)
    searchTerm = params.q;
  }
  return { searchTerm }
}

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (props, query) => {
    // dispatch search for a new query
    if (query && query !== props.searchTerm) {
      dispatch(search({ query: query }))
    }
  }
})

const initialState = { searchTerm: '' }

class Bento extends Component {
  constructor(props) {
    super(props)
    if (props.searchTerm) {
      this.state = { ...initialState, searchTerm: props.searchTerm }
    } else {
      this.state = initialState
    }
    this.containers = Object.keys(widgets).reduce((accum, key) => {
      accum[key] = subspaced(key)(widgets[key].widget)
      return accum
    }, {})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchTerm) {
      this.setState({ searchTerm: nextProps.searchTerm })
    }
  }

  handleClick = (e) => {
    this.props.handleSearch(this.props, this.state.searchTerm.trim())
  }

  handleSearchBoxKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.handleSearch(this.props, this.state.searchTerm.trim())
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ searchTerm: e.target.value })
  }

  renderWidgetContainer(key) {
    let Container = this.containers[key]
    return ( <Container key={key} /> )
  }

  render() {
    return (
      <div>
        <div className="container search-container">
          <div className="input-group">
            <input type="text" name="q" id="q" className="q form-control" placeholder="Search" autoComplete="off" autoFocus="autofocus" value={ this.state.searchTerm } onKeyPress={ this.handleSearchBoxKeyPress } onChange={ this.handleChange }/>
            <span className="input-group-btn">
              <button type="submit" className="btn btn-primary search-btn" id="search" onClick={ this.handleClick }>
                <span className="submit-search-text">Search</span>
              </button>
            </span>
          </div>
        </div>
        <div className="main-container">
              <div>
                { this.renderWidgetContainer('catalyst') }
              </div>
              <div>
                { this.renderWidgetContainer('aspace') }
              </div>
              <div>
                { this.renderWidgetContainer('eds') }
              </div>
              <div>
                { this.renderWidgetContainer('lara') }
              </div>
              <div>
                { this.renderWidgetContainer('libAnswers') }
              </div>
              <div>
                { this.renderWidgetContainer('libGuides') }
              </div>
              <div>
                { this.renderWidgetContainer('scopus') }
              </div>
              <div>
                { this.renderWidgetContainer('findit') }
              </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bento)
