// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import ActionButton from 'components/common/action-button'
import Icon from 'components/common/icon'
import Flex from 'components/common/flex'
import STYLE from 'constants/style'
import ROUTE from 'constants/route'

import style from './add-item-card.style'

type PropsType = {
  isFirstInRow: boolean,
}

class AddItemCard extends React.PureComponent<PropsType> {
  render = () => {
    const { isFirstInRow } = this.props
    return (
      <ActionButton
        css={[style.base, isFirstInRow && style.base__first]}
        to={ROUTE.PATH.ADD_ITEM}
      >
        <Flex column center>
          <Icon.Plus fill={STYLE.COLOR.BLUE} />
          <Flex css={style.text}>Add another</Flex>
        </Flex>
      </ActionButton>
    )
  }
}

export default AddItemCard
