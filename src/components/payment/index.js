/* eslint-disable */

/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import SmartTruncate from 'smart-truncate'

import Flex from 'components/common/flex'
import Web3Injected from 'singletons/web3/injected'
import FooterButton from 'components/common/footer-button'

import style from './index.style'

export default class Add extends React.PureComponent {
  state = {
    txHash: 'asdf',
  }

  componentDidMount = () => {
    this.sendTransaction()
  }

  render() {
    const { address, amount, orderId } = this.props.match.params
    return (
      <Flex grow column css={style.base}>
        {!this.isTransactionSent()
          ? this.renderWaitingForTransaction()
          : this.renderTransactionInProgress()}
      </Flex>
    )
  }

  renderWaitingForTransaction = () => {
    return (
      <Flex column grow>
        <Flex column justifyEnd css={style.title}>
          <Flex css={style.title_text}>Waiting for transaction</Flex>
        </Flex>
        <Flex column justifyEnd css={{ flex: 0.08 }}>
          <Flex css={style.title_details}>
            Please use your wallet overlay to send the payment
          </Flex>
        </Flex>
        <Flex column justifyEnd css={{ flex: 0.55 }}>
          <FooterButton onClick={this.sendTransaction}>Try again</FooterButton>
        </Flex>
      </Flex>
    )
  }

  renderTransactionInProgress = () => {
    const { address, amount, orderId } = this.props.match.params

    return (
      <Flex column grow>
        <Flex column justifyEnd css={style.title}>
          <Flex css={style.title_text}>Sent!</Flex>
        </Flex>
        <Flex column justifyEnd css={{ flex: 0.3 }}>
          <Flex column css={style.title_details}>
            <Flex style={{ marginBottom: 0 }}>Seller wallet address:</Flex>
            <Flex style={{ marginBottom: 10 }}>
              {SmartTruncate(address, 30, { position: 15 })}
            </Flex>
            <Flex style={{ marginBottom: 10 }}>Total Price: {amount}</Flex>
            <Flex style={{ marginBottom: 10 }}>Order ID: {orderId}</Flex>
          </Flex>
        </Flex>
      </Flex>
    )
  }

  //////////////
  // CHECKERS //
  //////////////

  isTransactionSent = () => !!this.state.txHash

  /////////////
  // HELPERS //
  /////////////

  sendTransaction = async () => {
    const { address, amount, orderId } = this.props.match.params

    const txHash = await Web3Injected.sendDai({
      address,
      amount,
      orderId,
    })

    this.setState({
      txHash,
    })
  }
}
