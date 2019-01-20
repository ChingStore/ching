import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

import qrUtil from 'utils/qr'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  root: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'relative',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: '100%',
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class QRDialog extends React.Component {
  state = {
    open: false,
    url: null,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.onClose()
  }

  getImage = () => {
    const base64 = qrUtil.generate(this.state.url)
    return `url(${base64})`
  }

  componentDidUpdate = prevProps => {
    if (this.props.url && !prevProps.url) {
      this.setState({ open: true, url: this.props.url })
    }
  }

  render = () => {
    const { classes } = this.props

    return (
      <Dialog
        fullScreen
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Scan to Pay
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <ButtonBase
            onClick={this.handleClose}
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              flex: 1,
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                flex: 1,
                backgroundImage: this.getImage(),
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </ButtonBase>
        </div>
      </Dialog>
    )
  }
}

QRDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(QRDialog)
