import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { subspaced } from 'react-redux-subspace'
import { bentoSearchBegin } from '../actions';
import LaraResourcesWidget from '../widgets/LaraResourcesWidget'
import SolrWidget from '../widgets/SolrWidget'
import ArchivesSpaceWidget from '../widgets/ArchivesSpaceWidget'
import EdsWidget from '../widgets/EdsWidget'
const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => {
      dispatch(bentoSearchBegin({ 
        query: 'test'
      }))
    }
  }
}

const LaraContainer = subspaced((state) => state.lara, 'lara')(LaraResourcesWidget)

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
            <LaraContainer />
          </Col>          
        </Row>
        <Row>
          <Col xs={12} md={6} lg={6}>
            <ArchivesSpaceWidget />
          </Col>
          <Col xs={12} md={6} lg={6}>
            <EdsWidget />
          </Col>          
        </Row>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bento)