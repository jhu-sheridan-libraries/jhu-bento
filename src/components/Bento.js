import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { searchCatalystBegin } from '../actions/catalyst';
import Catalyst from '../components/Catalyst'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      console.log('click')
      dispatch(searchCatalystBegin({ 
        query: 'test',
        solrSearchUrl: 'http://localhost:18983/solr/catalyst/select' }))
    }
  }
}

class Bento extends Component {
  sendClick = () => {
    this.props.handleClick()
  }
  render() {
    return (
      <Grid fluid>
        <Row top="xs">
          <Col xs={12} md={12} lg={12}>
            <button className="btn btn-primary" onClick={ this.sendClick }>Fetch</button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Catalyst />
          </Col>
          <Col xs={12} md={6} lg={6}>
            Hello, Universe!
            <p>this is a paragraph</p>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bento)