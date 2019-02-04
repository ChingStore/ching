/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Flex from 'components/common/flex'
import vectorImg from 'components/common/icon/Vector.png'

import style from './index.style.js'

class BackButton extends React.Component {
  render() {
    return (
      <Flex css={style.base}>
        <Flex
          css={style.button}
          {...this.props}
          onClick={this.handleClick}
          type="button"
        >
          <img src={vectorImg} alt="Go back" />
        </Flex>
      </Flex>
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
