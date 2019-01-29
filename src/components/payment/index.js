import React from 'react'
import PropTypes from 'prop-types'

import Web3Injected from 'singletons/web3/injected'

export default class Add extends React.PureComponent {
  componentDidMount = () => {
    const { address, amount, orderId } = this.props.match.params

    Web3Injected.sendDai({
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
