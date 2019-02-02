/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'
import vectorImg from 'components/common/icon/Vector.png'

import style from './index.style.js'

class BackButton extends React.Component {
  render() {
    return (
      <div css={style.base}>
        <button
          css={style.back__button}
          onClick={this.handleClick}
          type="button"
        >
          <img src={vectorImg} alt="Go back" />
        </button>
      </div>
    )
  }

  handleClick = event => {
    const { history, onClick } = this.props
    console.log(this.props)
    if (onClick) {
      onClick(event)
    }
    history.goBack()
  }
}

export default ReactRouter.withRouter(BackButton)
