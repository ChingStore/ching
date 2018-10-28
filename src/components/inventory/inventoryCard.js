import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Badge from './inventoryBadge'
import image from './contemplativeLizard.jpg'


const styles = {
  root:{

  },
  card: {
    width: "50%",
    height: 250,
    maxWidth: 250,
    backgroundColor: "transparent"
  },
  media: {
    position: "absolute",
    zIndex: -1,
    height: 250,
    width: 250,
    maxWidth: 250,
    top: "-20%"
  },
  content: {
    zIndex: 0,
    position: "relative",
    top: 123,
    color: "white",
    fontWeight: "bold"
  },
  button: {
    zIndex: 1
  },

};


function MediaCard(props) {
  const { classes } = props;

  // componentWillMount () {
  //   image = props.photo;
  // }

  return (
    <Card className={classes.card}>
      <ButtonBase onClick={props.onClick} style={{ flex: 1 }}>
        <Badge badgeContent={props.count}/>
        <CardActionArea className={classes.button}>
          <CardMedia
            className={classes.media}
            image={props.photo || image}
            alt={props.photo}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2" color="inherit">
              {props.name}
            </Typography>
            <Typography component="p" color="inherit">
              {props.name} cost {props.price} DAI
            </Typography>
          </CardContent>
        </CardActionArea>
      </ButtonBase>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
