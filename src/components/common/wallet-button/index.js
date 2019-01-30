/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router'
import Status from './Status'
import Trust from './Trust'
import Coinbase from './Coinbase'

class WalletButton extends React.Component {
  render() {
    const { targetWallet } = this.props
    return <button>{this.wallet(targetWallet)}</button>
  }

  wallet = targetWallet => {
    switch (targetWallet) {
      case 'Status':
        return <Status />
      case 'Trust':
        return <Trust />
      case 'Coinbase':
        return <Coinbase />
      default:
        return null
    }
  }

  handleClick = event => {
    const { history, to, onClick } = this.props
    console.log(this.props)
    onClick && onClick(event)
    to && history.push(to)
  }
}

export default ReactRouter.withRouter(WalletButton)

// export default class InputField extends React.Component {
//   render() {
//     const { labelText, ...rest } = this.props
//     return (
//       <div css={style.base}>
//         <label css={style.label}>{labelText}</label>
//         <input
//           css={this.props.type === 'password' ? style.password : style.input}
//           {...rest}
//         />
//         <hr css={style.line} />
//       </div>
//     )
//   }
// }
