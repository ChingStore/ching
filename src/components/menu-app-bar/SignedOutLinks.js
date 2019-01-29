import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'

import ROUTE from 'constants/route'

class SignedOutLinks extends Component {
  render() {
    return (
      <div>
        <ListItem
          button
          component={NavLink}
          to={ROUTE.PATH.SIGN_IN}
          onClick={this.props.handleDrawerClose}
        >
          <ListItemText primary={ROUTE.PATH_TITLE[ROUTE.PATH.SIGN_IN]} />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to={ROUTE.PATH.SIGN_UP}
          onClick={this.props.handleDrawerClose}
        >
          <ListItemText primary={ROUTE.PATH_TITLE[ROUTE.PATH.SIGN_UP]} />
        </ListItem>
      </div>
    )
  }
}

SignedOutLinks.propTypes = {
  handleDrawerClose: PropTypes.func,
}

export default SignedOutLinks
