import * as React from 'react'
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate'
// import Camera from './camera';
import Camera, { FACING_MODES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

import itemActions from 'redux/actions/item'
import ROUTE from 'constants/route'

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
    backgroundColor: 'cornsilk',
  },
  button: {
    backgroundColor: 'seashell',
    borderBottom: 'solid 3px black',
    borderLeft: 'solid 3px darkgrey',
    borderRight: 'solid 3px darkgrey',
    borderTop: 'solid 3px lightgrey',
  },
})

class OutlinedInputAdornments extends React.Component {
  state = {
    name: '',
    picture: '',
    quantity: '',
    soldCount: 0,
    price: '',
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  onTakePhoto(dataUri) {
    this.setState({ picture: dataUri })
    console.log('takePhoto')
  }

  onCameraError(error) {
    console.error('onCameraError', error)
  }

  handleSave = () => {
    if (!this.state.name || !this.state.quantity || !this.state.price) {
      alert('No changes saved.')
      console.log('Leaving!')
      return
    }
    this.props.addItem({
      name: this.state.name,
      quantity: this.state.quantity,
      price: this.state.price,
      picture: this.state.picture,
      soldCount: this.state.soldCount,
    })
  }

  render() {
    const { classes } = this.props

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
            startAdornment: (
              <InputAdornment position="start">Item</InputAdornment>
            ),
          }}
        />
        <Camera
          onTakePhoto={dataUri => {
            this.onTakePhoto(dataUri)
          }}
          onCameraError={error => {
            this.onCameraError(error)
          }}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
        />

        <TextField
          id="outlined-adornment-picture"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Picture (optional)"
          value={this.state.picture}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>
                  <AddPhotoAlternate />
                </Icon>
              </InputAdornment>
            ),
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
        <Button
          size="large"
          className={classNames(classes.button)}
          onClick={this.handleSave}
          component={NavLink}
          to={ROUTE.PATH.INVENTORY}
        >
          Save
        </Button>
      </div>
    )
  }
}

OutlinedInputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
  addItem: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(itemActions.add(item)),
})

export default Redux.compose(
  withStyles(styles),
  ReactRedux.connect(
    null,
    mapDispatchToProps
  )
)(OutlinedInputAdornments)
