import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import ROUTE from 'constants/route'

class SignedOutLinks extends Component {
  render() {
    return (
      <div>
        <ListItem
          button
          component={NavLink}
          to={ROUTE.PATH.SIGNIN}
          onClick={this.props.handleDrawerClose}
        >
          <ListItemText primary={ROUTE.PATH_TITLE[ROUTE.PATH.SIGNIN]} />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to={ROUTE.PATH.SIGNUP}
          onClick={this.props.handleDrawerClose}
        >
          <ListItemText primary={ROUTE.PATH_TITLE[ROUTE.PATH.SIGNUP]} />
        </ListItem>
      </div>
    )
  }
}

export default SignedOutLinks
