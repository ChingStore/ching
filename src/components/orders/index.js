/* eslint-disable */

import _ from 'lodash'
import React from 'react'
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'

import selectors from '../../redux/selectors'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

class Orders extends React.PureComponent {
  // ///////////////////
  // LIFECYCLE HOOKS //
  // ///////////////////

  // ///////////
  // GETTERS //
  // ///////////

  getOrderDetailsString = order => {
    let details = ''

    if (this.isHashReceivied(order)) {
      details += `${order.txHash
        .toString()
        .slice(0, 5)}...${order.txHash.toString().slice(60)}, `
    } else {
      details += 'No txHash yet, '
    }
    if (this.isConfirmed(order)) {
      details += 'status: confirmed'
    } else {
      details += 'status: pending'
    }
    return details
  }

  getOrderTimestampString = order => moment(order.createdAt.toDate()).fromNow()

  // ////////////
  // CHECKERS //
  // ////////////

  isConfirmed = order => order.txConfirmed

  isHashReceivied = order => order.txHash

  // ///////////
  // HELPERS //
  // ///////////

  render() {
    const { orders, classes } = this.props

    return (
      <List className={classes.root}>
        {orders &&
          _.map(orders, (order, id) => (
            <ListItem key={id}>
              <Avatar>
                <ImageIcon />
              </Avatar>
              <ListItemText
                primary={this.getOrderDetailsString(order)}
                secondary={this.getOrderTimestampString(order)}
              />
            </ListItem>
          ))}
      </List>
    )
  }
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object),
}

const mapStateToProps = state => ({
  orders: selectors.orders.all(state),
})

export default Redux.compose(
  withStyles(styles, { withTheme: true }),
  ReactRedux.connect(mapStateToProps)
)(Orders)
