import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { subspaced } from 'react-redux-subspace'
import qs from 'query-string'
import { searchBegin } from '../actions'
import LaraResourcesWidget from '../widgets/LaraResourcesWidget'
import CatalystWidget from '../widgets/CatalystWidget'
import ArchivesSpaceWidget from '../widgets/ArchivesSpaceWidget'
import EdsWidget from '../widgets/EdsWidget'
import ScopusWidget from '../widgets/ScopusWidget'
import LibAnswersWidget from '../widgets/LibAnswersWidget'

const mapStateToProps = (state, ownProps) => {
  let searchTerm = ''
  if (ownProps.location.search) {
    let params = qs.parse(ownProps.location.search)
    searchTerm = params.q; 
  } 
  return { searchTerm }
}

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (props, query) => { 
    if (query && query !== props.searchTerm) {
      dispatch(searchBegin({ query: query }))
    }    
  }
})

const LaraContainer = subspaced('lara')(LaraResourcesWidget)
const CatalystContainer = subspaced('catalyst')(CatalystWidget)
const ArchivesSpaceContainer = subspaced('aspace')(ArchivesSpaceWidget)
const EdsContainer = subspaced('eds')(EdsWidget)
const ScopusContainer = subspaced('scopus')(ScopusWidget)
const LibAnswersContainer = subspaced('libAnswers')(LibAnswersWidget)

class Bento extends Component {
  constructor(props) {
    super(props)
    if (props.searchTerm) {
      this.state = { searchTerm: props.searchTerm }  
    } else {
      this.state = { searchTerm: '' }
    }
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
        <CatalystContainer />
        <LaraContainer />
        <ArchivesSpaceContainer />
        <EdsContainer />
        <ScopusContainer />
        <LibAnswersContainer />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bento)