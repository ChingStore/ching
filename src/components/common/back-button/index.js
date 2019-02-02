/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router'
import vectorImg from 'components/common/icon/Vector.png'

import style from './index.style.js'

class BackButton extends React.Component {
  render() {
    return (
      <div css={style.button__location}>
        <button css={style.continue__button} onClick={this.handleClick}>
          <img css={style.vector} src={vectorImg} alt="" />
        </button>
      </div>
    )
  }

  handleClick = event => {
    const { history, onClick } = this.props
    console.log(this.props)
    onClick && onClick(event)
    history.goBack()
  }
}

export default ReactRouter.withRouter(BackButton)
