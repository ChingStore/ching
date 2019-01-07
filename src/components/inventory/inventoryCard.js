import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import Badge from './inventoryBadge'
import image from './contemplativeLizard.jpg'

const styles = {
  root: {},
  card: {
    width: '50%',
    height: 250,
    maxWidth: 250,
    backgroundColor: 'transparent',
  },
  media: {
    position: 'absolute',
    zIndex: -1,
    height: 250,
    width: 250,
    maxWidth: 250,
    top: 0,
  },
  content: {
    zIndex: 0,
    position: 'relative',
    top: 123,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
}

function MediaCard(props) {
  const { classes } = props

  // componentWillMount () {
  //   image = props.picture;
  // }

  return (
    <Card className={classes.card}>
      <ButtonBase onClick={props.onClick} style={{ flex: 1 }}>
        <Badge badgeContent={props.quantity} />
        <CardActionArea className={classes.button}>
          <CardMedia
            className={classes.media}
            image={props.picture || image}
            alt={props.picture}
          />
          <CardContent className={classes.content}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="inherit"
            >
              {props.name}
            </Typography>
            <Typography component="p" color="inherit">
              {props.name} cost {props.price} DAI
            </Typography>
          </CardContent>
        </CardActionArea>
      </ButtonBase>
    </Card>
  )
}

// @dev some of these proptypes may be incorrect
MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  count: PropTypes.number,
  photo: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.string,
  picture: PropTypes.string,
}

export default withStyles(styles)(MediaCard)
