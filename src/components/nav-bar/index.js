// @flow

/** @jsx jsx */
import { jsx } from '@emotion/core'
import _ from 'lodash'
import React from 'react'
import * as ReactRouter from 'react-router-dom'

import Flex from 'components/common/flex'
import Icon from 'components/common/icon'
import ROUTE from 'constants/route'
import STYLE from 'constants/style'

import style from './index.style'

const TABS = [
  {
    title: 'Store',
    icon: Icon.Store,
    route: ROUTE.PATH.STORE,
  },
  {
    title: 'Sales',
    icon: Icon.Sales,
    route: ROUTE.PATH.SALES,
  },
  {
    title: 'Profile',
    icon: Icon.Profile,
    route: ROUTE.PATH.PROFILE,
  },
]
type TabType = $ElementType<typeof TABS, number>

type PropsType = ReactRouter.ContextRouter

class NavBar extends React.PureComponent<PropsType> {
  render() {
    return (
      <Flex noShrink css={style.base}>
        {TABS.map(tab => (
          <Flex
            css={style.tab}
            onClick={() => this.handleTabClick(tab)}
            key={tab.title}
          >
            <tab.icon
              fill={this.isActiveTab(tab) ? STYLE.COLOR.BLUE : STYLE.COLOR.GREY}
            />
            <span css={style.tab_text}>{tab.title}</span>
          </Flex>
        ))}
      </Flex>
    )
  }

  ////////////////////
  // EVENT HANDLERS //
  ////////////////////

  handleTabClick = (tab: TabType) => {
    this.props.history.push(tab.route)
  }

  //////////////
  // CHECKERS //
  //////////////

  isActiveTab = (tab: TabType): boolean => {
    const currentPath = this.props.location.pathname
    return currentPath === tab.route
  }

  getActiveTab = (props: PropsType = this.props): ?TabType => {
    return _.find(TABS, { route: props.location.pathname })
  }
}

export default ReactRouter.withRouter(NavBar)
