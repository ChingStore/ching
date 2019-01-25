import React from 'react'
import PropTypes from 'prop-types'

import web3Dai from 'singletons/web3/dai'

export default class Add extends React.PureComponent {
  componentDidMount = () => {
    const { address, amount, orderId } = this.props.match.params

    web3Dai.sendDAI({
      address,
      amount,
      orderId,
    })
  }

  render() {
    const { address, amount, orderId } = this.props.match.params
    return (
      <div>
        {address}, {amount}, {orderId}
        <div />
        <pre />
      </div>
    )
  }
}

Add.propTypes = {
  match: PropTypes.object,
}
