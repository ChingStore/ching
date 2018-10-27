import React from 'react'
import Table from './salesTable'

export default class SalesReport extends React.PureComponent {
  render() {
    return (
      <div>
        <div>I{"'"}m the sales report scene!</div>
        <Table />
      </div>
    )
  }
}
