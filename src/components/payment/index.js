import React from 'react'

import web3Util from '../../singletons/web3/web3'

export default class Add extends React.PureComponent {
  componentWillMount = () => {
    const { address, amount } = this.props.match.params
    web3Util.send({ address, amount })
  }

  render() {
    return (
      <div>
        <div>Loading...</div>
        <pre />
      </div>
    )
  }
}
