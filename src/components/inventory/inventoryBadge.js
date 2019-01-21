import React from 'react'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  badge: {
    zIndex: 2,
    top: -35,
    right: -35,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`,
  },
})

function CustomizedBadge(props) {
  const { classes } = props

  return (
    <Badge
      badgeContent={props.badgeContent}
      color="primary"
      classes={{ badge: classes.badge }}
    />
  )
}

CustomizedBadge.propTypes = {
  classes: PropTypes.object.isRequired,
  badgeContent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default withStyles(styles)(CustomizedBadge)
