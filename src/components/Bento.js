import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { subspaced } from 'react-redux-subspace'
import { searchBegin } from '../actions';
import LaraResourcesWidget from '../widgets/LaraResourcesWidget'
import CatalystWidget from '../widgets/CatalystWidget'
import ArchivesSpaceWidget from '../widgets/ArchivesSpaceWidget'
import EdsWidget from '../widgets/EdsWidget'

const mapStateToProps = (state) => {
  let { query } = state.bento
  return { query }
}

const mapDispatchToProps = (dispatch) => ({
  handleSearch: (query) => dispatch(searchBegin({ query: query }))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps, ...stateProps, ...dispatchProps, handleSearch(query) {
    // dispatch if the query is not blank and a new query
    if (query && stateProps.query != query) {
      dispatchProps.handleSearch(query)
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
  }

  handleClick = (e) => {
    e.preventDefault()
    this.props.handleSearch(this.refs.search.value.trim())
  }

  handleSearchBoxKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.props.handleSearch(e.target.value.trim())
    }
  }

  render() {
    return (
      <Grid fluid>
        <Row top="xs">
          <Col xs={12} md={12} lg={12}>
            <input ref="search" type="search" placeholder="Search" onKeyPress={ this.handleSearchBoxKeyPress } />
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Bento)