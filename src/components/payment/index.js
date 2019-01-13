import React from 'react'
import web3Util from '../../singletons/web3/web3'

export default class Add extends React.PureComponent {
  componentDidMount = () => {
    const {
      address,
      amount,
      userId,
      orderId,
      authToken,
    } = this.props.match.params

    web3Util.send({
      address,
      amount,
      userId,
      orderId,
      authToken,
    })
  }

  render() {
    const {
      address,
      amount,
      userId,
      orderId,
      authToken,
    } = this.props.match.params
    return (
      <div>
        {address}, {amount}, {userId}, {orderId}, {authToken}
        <div />
        <pre />
      </div>
    )
  }
}
