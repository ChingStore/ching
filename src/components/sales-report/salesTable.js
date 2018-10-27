import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '400',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
    padding: 'none'
  },
  table: {
    minWidth: 0,
    maxWidth: '100%',
    padding: 'none'
  },
});

let id = 0;
function createData(name, units, sales) {
  id += 1;
  return { id, name, units, sales };
}

const rows = [
  createData('Lizards', 4, 60.0),
  createData('Cupcakes', 12, 24.0),
  createData('Shovels', 3, 39.97),
  createData('Special Favors', 1, 100),
  createData('Taxation is theft', 1, 3.14),
  createData('#FreeRoss', 100, 530.9),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell >Units Sold</TableCell>
            <TableCell >Gross Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell >{row.units}</TableCell>
                <TableCell >{row.sales}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
