import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter, NavLink } from "react-router-dom";
import ROUTE from "../../constants/route";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function OutlinedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button
        variant="outlined"
        component={NavLink}
        to={ROUTE.PATH.SIGNUP}
        className={classes.button}
      >
        {ROUTE.PATH_TITLE[ROUTE.PATH.SIGNUP]}
      </Button>
    </div>
  );
}

OutlinedButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedButtons);
