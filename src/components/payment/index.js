import React from 'react'
import PropTypes from 'prop-types'

import web3Util from '../../singletons/web3/web3'

export default class Add extends React.PureComponent {
  componentDidMount = () => {
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

Add.propTypes = {
  match: PropTypes.obj,
  params: PropTypes.obj,
  address: PropTypes.string,
  amount: PropTypes.number,
}
