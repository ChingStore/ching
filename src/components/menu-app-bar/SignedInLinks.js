import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

class SignedInLinks extends Component {
  render() {
    return (
      <ListItem button onClick={this.props.signOutAndHandleDrawerClose}>
        <ListItemText primary="Sign Out" />
      </ListItem>
    )
  }
}

export default SignedInLinks
