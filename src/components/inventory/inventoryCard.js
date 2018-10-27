import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Badge from './inventoryBadge'
import image from './contemplativeLizard.jpg'
import plus from './plus.svg'

const styles = {
  root:{
    // height: "-webkit-fill-available"
    // height: "100%"
    // color: "green"
  },
  card: {
    backgroundColor: "transparent",
    width: "50%",
    height: "50%"
  },
  media: {
    position: "fixed",
    zIndex: -1,
    height: 200,
    width: 200
  },
  content: {

  },
  button: {
    
  }
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <Badge />
      <CardActionArea className={classes.button}>
        <CardMedia
          className={classes.media}
          image={props.photo || image}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography component="p">
            {props.name} cost {props.price} DAI
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
