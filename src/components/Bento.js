import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { subspaced } from 'react-redux-subspace'
import qs from 'query-string'
import { searchBegin } from '../actions';
import LaraResourcesWidget from '../widgets/LaraResourcesWidget'
import CatalystWidget from '../widgets/CatalystWidget'
import ArchivesSpaceWidget from '../widgets/ArchivesSpaceWidget'
import EdsWidget from '../widgets/EdsWidget'

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
    this.props.handleSearch(this.props, this.state.searchTerm)
  }

  handleSearchBoxKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.handleSearch(this.props, this.state.searchTerm)
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ searchTerm: e.target.value.trim() })
  }

  render() {
    return (
      <Grid fluid>
        <Row top="xs">
          <Col xs={12} md={12} lg={12}>
            <input ref="search" type="search" placeholder="Search" onKeyPress={ this.handleSearchBoxKeyPress } value={ this.state.searchTerm } onChange={ this.handleChange } />
            <button className="btn btn-primary" onClick={ this.handleClick }>Fetch</button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} lg={6}>
            <CatalystContainer />
          </Col>
          <Col xs={12} md={6} lg={6}>
            <LaraContainer />
          </Col>          
        </Row>
        <Row>
          <Col xs={12} md={6} lg={6}>
            <ArchivesSpaceContainer />
          </Col>
          <Col xs={12} md={6} lg={6}>
            <EdsContainer />
          </Col>          
        </Row>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bento)