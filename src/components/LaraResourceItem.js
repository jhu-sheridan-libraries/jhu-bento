import React from 'react'

const LaraResourceItem = ({ record, index }) => (
  <div>
    <h4>
      <span>{ index + 1 }.</span>&nbsp;&nbsp;
      <span>{ record.attributes.name }</span>
    </h4>
    <p>{ record.attributes.description }</p>
  </div>
)    

export default LaraResourceItem