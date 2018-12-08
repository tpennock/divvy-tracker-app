import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  table: {
    minWidth: 700,
  }
};

let id = 0;
function createData(name, expenses, budget) {
  let over = expenses > budget ? 'Yes' : 'No';
  id += 1;
  return { id, name, expenses, budget, over };
}

const data = [
  createData('Cindy Hawthorne', 250.85, 500.00),
  createData('Dave Johnson', 350.21, 300.00),
  createData('Peter Trimble', 85.25, 300.00),
  createData('Kyle Smith', 420.23, 500.00),
  createData('Sarah Moore', 11.48, 200.00),
  createData('Andrew Thomas', 650.42, 1000.00)
];

class Users extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <main className={classes.content}>
          <Typography variant="h4" gutterBottom component="h2">
            Users
          </Typography>
          <Typography variant="body1" gutterBottom>
            Coming soon... (The data represented here is entirely fake)
          </Typography>
          <div className={classes.tableContainer}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell numeric>Expenses</TableCell>
                    <TableCell numeric>Budget</TableCell>
                    <TableCell>Over?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(n => {
                    return (
                      <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                          {n.name}
                        </TableCell>
                        <TableCell numeric>{n.expenses}</TableCell>
                        <TableCell numeric>{n.budget}</TableCell>
                        <TableCell>{n.over}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </main>
      </div>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);
