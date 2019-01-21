import React from 'react'
import PropTypes from 'prop-types'

import web3Util from 'singletons/web3/web3'

export default class Add extends React.PureComponent {
  componentDidMount = () => {
    const { address, amount, orderId } = this.props.match.params

    web3Util.send({
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
