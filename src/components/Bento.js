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
      dispatch(searchCatalystBegin('test'))
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
          <Col xs={6} md={4} lg={2}>
            <button className="btn btn-primary" onClick={ this.sendClick }>Fetch</button>
          </Col>
          <Col xs={6} md={8} lg={10}>
            Hello, Universe!
            <p>this is a paragraph</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4} lg={2}>
            <Catalyst />
          </Col>
          <Col xs={6} md={8} lg={10}>
            Hello, Universe!
            <p>this is a paragraph</p>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bento)