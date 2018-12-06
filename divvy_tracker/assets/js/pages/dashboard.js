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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DialogAddTransaction from '../components/dialogs/dialog-add-transaction';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const styles = theme => ({
  table: {
    minWidth: 700,
  },
  fab: {
    position: 'absolute',
    // bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

// data
let id = 0;
function createData(date, name, category, merchant, amount, notes) {
  id += 1;
  return { id, date, name, category, merchant, amount, notes };
}

const data = [
  createData(format(new Date(), 'MM/DD/YYYY'), 'Cindy Hawthorne', 'Food', 'Cost Vida', 35.64, ''),
  createData(format(new Date(), 'MM/DD/YYYY'), 'Dave Johnson', 'Travel', 'Delta', 458.25, ''),
  createData(format(new Date(), 'MM/DD/YYYY'), 'Peter Trimble', 'Food', 'JDawgs', 8.98, ''),
  createData(format(new Date(), 'MM/DD/YYYY'), 'Kyle Smith', 'Training', 'Pluralsite', 118.85, ''),
  createData(format(new Date(), 'MM/DD/YYYY'), 'Sarah Moore', 'Food', 'Arby\'s', 11.48, ''),
  createData(format(new Date(), 'MM/DD/YYYY'), 'Andrew Thomas', 'Office Snacks', 'Costco', 258.54, '')
];

class Dashboard extends React.Component {
  state = {
    dialogOpen: false // this controls dialog visibility and will be passed -> child dialog
  };

  handleDialogToggle = () => {
    this.setState(state => ({ dialogOpen: !state.dialogOpen }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <main>
          <Typography variant="h4" gutterBottom component="h2">
            Dashboard
            <Fab color="primary" aria-label="Add" size="small" className={classes.fab} onClick={this.handleDialogToggle}>
              <AddIcon />
            </Fab>
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
            <DialogAddTransaction open={this.state.dialogOpen} closeDialog={this.handleDialogToggle} />
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
