import _ from 'lodash'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '400',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
    padding: 'none',
  },
  table: {
    minWidth: 0,
    maxWidth: '100%',
    padding: 'none',
  },
})

class SalesTable extends Component {
  render() {
    const { classes, items } = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Units Sold</TableCell>
              <TableCell>Gross Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(items, (item, id) => {
              if (item.soldCount > 0) {
                return (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell>{item.soldCount}</TableCell>
                    <TableCell>
                      {Math.round(item.soldCount * item.price * 100) / 100}
                    </TableCell>
                  </TableRow>
                )
              }
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

SalesTable.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.object,
}

export default withStyles(styles)(SalesTable)
