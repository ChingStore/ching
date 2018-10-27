import React from 'react'
import Card from './inventoryCard.js'

export default class SalesReport extends React.PureComponent {
  render() {
    return (
      <div>
        <div>I{"'"}m the inventory scene!</div>
        <Card />
      </div>
    )
  }
}
