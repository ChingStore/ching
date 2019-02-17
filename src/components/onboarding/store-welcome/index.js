/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import React from 'react'

import ROUTE from 'constants/route'
import Flex from 'components/common/flex'
import FooterButton from 'components/common/footer-button'
import Icon from 'components/common/icon'

import style from './index.style.js'

export default class StoreWelcomeScene extends React.Component {
  render() {
    return (
      <Flex column grow css={style.base}>
        {this.renderTitle()}
        {this.renderArt()}
        {this.renderAddFirstItem()}
      </Flex>
    )
  }

  renderTitle = () => (
    <Flex column justifyCenter alignLeft css={style.title}>
      <p css={style.title__text}>{this.getStoreName()}</p>
      <p css={style.welcome__msg}>Welcome to your store!</p>
    </Flex>
  )

  renderArt = () => (
    <Flex column center css={style.art}>
      <Icon.StoreWelcomeArt />
    </Flex>
  )

  renderAddFirstItem = () => (
    <Flex column justifyCenter css={style.addFirstItem}>
      <FooterButton to={ROUTE.PATH.ADD_ITEM}>Add a first item</FooterButton>
    </Flex>
  )

  getStoreName = () => _.get(this.props, 'store.storeName')
}
