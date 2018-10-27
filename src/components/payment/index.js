import React from 'react'
import dai from '@makerdao/dai'

import web3Util from '../../utils/web3'

export default class Add extends React.PureComponent {

  componentWillMount = () => {
    const { address, amount } = this.props.match.params
    web3Util.send({ address, amount })
  }

  render() {
    return (
      <div>
        <div>I{"'"}m the payment scene!</div>
        <pre>
        </pre>
      </div>
    )
  }
}
