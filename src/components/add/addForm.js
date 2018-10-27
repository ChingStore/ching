import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

class OutlinedInputAdornments extends React.Component {
  state = {
    name: '',
    picture: '',
    quanitity: 0,
    price: ''
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  // handleClickShowPassword = () => {
  //   this.setState(state => ({ showPassword: !state.showPassword }));
  // };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          id="outlined-adornment-item-name"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Item Name"
          InputProps={{
            startAdornment: <InputAdornment position="start">Item Name</InputAdornment>,
          }}
        />
        <TextField
          id="outlined-adornment-picture"
          select
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Picture"
          value={this.state.picture}
          onChange={this.handleChange('picture')}
          InputProps={{
            startAdornment: <InputAdornment position="start">Picture</InputAdornment>,
          }}
        >
        </TextField>
        <TextField
          id="outlined-adornment-price"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Price"
          value={this.state.price}
          onChange={this.handleChange('price')}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          id="outlined-adornment-quantity"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Quantity"
          value={this.state.quantity}
          onChange={this.handleChange('quantity')}
          helperText="Quantity"
          InputProps={{

          }}
        />
        <div>save button goes here</div>
      </div>
    );
  }
}

OutlinedInputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedInputAdornments);
