/* eslint-disable */
import React from 'react'
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import { NavLink } from 'react-router-dom'
import selectors from 'redux/selectors'

import ROUTE from 'constants/route'
import plus from './plus.svg'

const styles = {
  card: {
    backgroundColor: 'cornsilk',
    width: '50%',
    height: 250,
    maxWidth: 250,
  },
  media: {
    height: 250,
  },
}

function MediaCard(props) {
  const { classes, auth } = props

  const path = auth.uid ? ROUTE.PATH.ADD : ROUTE.PATH.SIGN_IN

  return (
    <Card className={classes.card}>
      <CardActionArea component={NavLink} to={path}>
        <CardMedia className={classes.media} image={plus} title="Add Item" />
      </CardActionArea>
    </Card>
  )
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: selectors.getAuthState(state),
})

export default Redux.compose(
  withStyles(styles),
  ReactRedux.connect(mapStateToProps)
)(MediaCard)
