import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { bentoSearchBegin } from '../actions';
import LaraResources from './LaraResources'
import SolrWidget from '../widgets/SolrWidget'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      console.log('click')
      dispatch(bentoSearchBegin({ 
        query: 'test'
      }))
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
            <SolrWidget />
          </Col>
          <Col xs={12} md={6} lg={6}>
            <LaraResources />
          </Col>          
        </Row>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bento)