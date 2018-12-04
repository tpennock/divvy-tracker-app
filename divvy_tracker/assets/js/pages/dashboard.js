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
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const styles = {
  table: {
    minWidth: 700,
  },
};

let id = 0;
function createData(date, name, category, merchant, amount) {
  id += 1;
  return { id, date, name, category, merchant, amount };
}

const data = [
  createData(format(new Date(), 'MM/DD/YYYY'), 'Cindy Hawthorne', 'Food', 'Cost Vida', 35.64),
  createData(format(new Date(), 'MM/DD/YYYY'), 'Dave Johnson', 'Travel', 'Delta', 458.25),
  createData(format(new Date(), 'MM/DD/YYYY'), 'Peter Trimble', 'Food', 'JDawgs', 8.98),
  createData(format(new Date(), 'MM/DD/YYYY'), 'Kyle Smith', 'Training', 'Pluralsite', 118.85),
  createData(format(new Date(), 'MM/DD/YYYY'), 'Sarah Moore', 'Food', 'Arby\'s', 11.48),
  createData(format(new Date(), 'MM/DD/YYYY'), 'Andrew Thomas', 'Office Snacks', 'Costco', 258.54)
];

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <main className={classes.content}>
          <Typography variant="h4" gutterBottom component="h2">
            Dashboard
          </Typography>
          <div className={classes.tableContainer}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Merchant</TableCell>
                    <TableCell numeric>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(n => {
                    return (
                      <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                          {n.date}
                        </TableCell>
                        <TableCell>{n.name}</TableCell>
                        <TableCell>{n.category}</TableCell>
                        <TableCell>{n.merchant}</TableCell>
                        <TableCell numeric>{n.amount}</TableCell>
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

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
