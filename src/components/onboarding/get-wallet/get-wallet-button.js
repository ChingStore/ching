// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as React from 'react'

import ActionButton from 'components/common/action-button'
import GET_WALLET_BUTTON from 'constants/get-wallet-button'

type PropsType = {
  type: string,
  children: React.Node,
}

class GetWalletButton extends React.PureComponent<PropsType> {
  render = () => {
    const { type, children, ...restProps } = this.props

    return (
      // $FlowFixMe
      <ActionButton
        Icon={GET_WALLET_BUTTON.ICON[type]}
        url={GET_WALLET_BUTTON.LINK[type]}
        css={{ backgroundColor: GET_WALLET_BUTTON.COLOR[type] }}
        {...restProps}
      >
        {children}
      </ActionButton>
    )
  }
}

export default GetWalletButton
