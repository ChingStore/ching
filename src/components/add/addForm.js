import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ROUTE from '../../constants/route'
import itemAction from "../../redux/actions/item"

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
    quantity: '',
    price: ''
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({ picture: event.target.value})
  };

  handleSave = () => {

    if (this.state.name === '' || this.state.quantity === '' || this.state.price === ''){
      alert("No changes saved.");
      console.log("Leaving!");
    } else {
      this.props.dispatch(itemAction.add({
        name: this.state.name,
        picture: this.state.picture,
        count: this.state.quantity,
        price: this.state.price,
        photo: this.state.photo
      }))
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          id="outlined-adornment-item-name"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Item Name"
          value={this.state.name}
          onChange={this.handleChange('name')}
          InputProps={{
            startAdornment: <InputAdornment position="start">Item</InputAdornment>,
          }}
        />
        <TextField
          id="outlined-adornment-picture"
          type="file"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Picture (optional)"
          value={this.state.picture}
          onChange={this.fileSelectedHandler}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Icon><ShoppingCartIcon /></Icon></InputAdornment>,
          }}
        />
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
          InputProps={{
            startAdornment: <InputAdornment position="start">#</InputAdornment>,
          }}
        />
        <Button size="large" color="primary" onClick={this.handleSave} component={NavLink} to={ROUTE.PATH.INVENTORY}>
          Save
        </Button>
      </div>
    );
  }
}

OutlinedInputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {}
const mapDispatchToProps = (dispatch) => {

}


export default compose(
  withStyles(styles),
  connect()
)(OutlinedInputAdornments)
