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
import { withRouter, NavLink } from 'react-router-dom';

import ROUTE from '../../constants/route'
import plus from './plus.svg'

const styles = {
  card: {
    width: 200,
    heigt: 200
  },
  media: {
    height: 140,
    width: 140
  },
};

function MediaCard(props) {
  const { classes } = props;
  // if (1 === 0){
    return (
      <Card className={classes.card}>
        <CardActionArea component={NavLink} to={ROUTE.PATH.ADD}>
          <CardMedia
            className={classes.media}
            image={plus}
            title="Add Item"
          />
        </CardActionArea>

      </Card>
    );
  // } else {

  // }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
