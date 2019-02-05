/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Button from 'components/common/button'
import Flex from 'components/common/flex'
import vectorImg from 'components/common/icon/Vector.png'

import style from './index.style.js'

class BackButton extends React.Component {
  render() {
    return (
      <Flex css={style.base}>
        <Button css={style.button} {...this.props} onClick={this.handleClick}>
          <img src={vectorImg} alt="Go back" />
        </Button>
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
