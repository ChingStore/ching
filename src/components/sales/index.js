import React from 'react'

import SalesReport from '../sales-report'
import Orders from '../orders'

export default () => (
  <div style={{ overflow: 'scroll' }}>
    <SalesReport />
    <Orders />
  </div>
)
