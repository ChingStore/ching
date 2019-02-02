/* eslint-disable */
import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'

class SignedInLinks extends Component {
  render() {
    return (
      <ListItem button onClick={this.props.signOutAndHandleDrawerClose}>
        <ListItemText primary="Sign Out" />
      </ListItem>
    )
  }
}

SignedInLinks.propTypes = {
  signOutAndHandleDrawerClose: PropTypes.func,
}

export default SignedInLinks
