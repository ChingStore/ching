import _ from 'lodash'
import React from 'react'
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import * as ReactReduxFirebase from 'react-redux-firebase'
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

class Orders extends React.PureComponent {
  orderDetails = order => {
    var details = ''

    if (order.txHash) {
      details +=
        order.txHash.toString().slice(0, 5) +
        '...' +
        order.txHash.toString().slice(60) +
        ', '
    } else {
      details += 'No txHash yet, '
    }
    if (order.txConfirmed) {
      details += 'status: confirmed'
    } else {
      details += 'status: pending'
    }
    return details
  }

  render() {
    const { orders, classes } = this.props

    return (
      <List className={classes.root}>
        {orders &&
          _.map(orders, (order, id) => {
            return (
              <ListItem key={id}>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText
                  primary={this.orderDetails(order)}
                  secondary={moment(order.createdAt.toDate()).fromNow()}
                />
              </ListItem>
            )
          })}
      </List>
    )
  }
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: selectors.getAuthState(state),
  orders: selectors.getOrders(state),
})

export default Redux.compose(
  withStyles(styles, { withTheme: true }),
  ReactRedux.connect(mapStateToProps),
  ReactReduxFirebase.firestoreConnect(props => {
    if (!props.auth || !props.auth.uid) return []
    return [
      {
        collection: 'orders',
        orderBy: ['createdAt', 'desc'],
        where: ['userId', '==', props.auth.uid],
      },
    ]
  })
)(Orders)
