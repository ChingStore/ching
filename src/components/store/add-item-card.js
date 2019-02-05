// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import Icon from 'components/common/icon'
import Flex from 'components/common/flex'
import STYLE from 'constants/style'

import style from './add-item-card.style'

type PropsType = {
  isFirstInRow: boolean,
}

class AddItemCard extends React.PureComponent<PropsType> {
  render = () => {
    const { isFirstInRow } = this.props
    return (
      <Flex column center css={[style.base, isFirstInRow && style.base__first]}>
        <Icon.Plus fill={STYLE.COLOR.BLUE} />
        <Flex css={style.text}>Add another</Flex>
      </Flex>
    )
  }
}

export default AddItemCard
