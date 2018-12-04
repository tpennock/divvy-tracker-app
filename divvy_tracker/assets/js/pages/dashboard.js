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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

// form values
const categories = [
  {
    value: 'food',
    label: 'Food',
  },
  {
    value: 'travel',
    label: 'Travel',
  },
  {
    value: 'training',
    label: 'Training',
  },
  {
    value: 'office_snacks',
    label: 'Office Snacks',
  },
  {
    value: 'fuel',
    label: 'Fuel',
  }
];

class Dashboard extends React.Component {
  state = {
    open: false,
    form: {
      name: '',
      date: format(new Date(), 'YYYY-MM-DD'),
      category: '',
      merchant: '',
      amount:'',
      notes: ''
    }
  };

  handleDialogToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  addTransaction = () => {
    this.handleDialogToggle()
    //TODO: save transaction data
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <main className={classes.content}>
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
            <Dialog
              fullWidth={true}
              open={this.state.open}
              onClose={this.handleDialogToggle}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">New Transaction</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter details below to track an expense.
                </DialogContentText>
                <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                    id="name"
                    label="Name"
                    fullWidth
                    className={classes.textField}
                    value={this.state.form.name}
                    margin="normal"
                  />
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    fullWidth
                    value={this.state.form.date}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="category"
                    select
                    fullWidth
                    label="Category"
                    className={classes.textField}
                    value={this.state.form.category}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="Please select your currency"
                    margin="normal"
                  >
                    {categories.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="merchant"
                    label="Merchant"
                    className={classes.textField}
                    fullWidth
                    value={this.state.form.merchant}
                    margin="normal"
                  />
                  <TextField
                    id="amount"
                    label="Amount"
                    fullWidth
                    className={classes.textField}
                    value={this.state.form.amount}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                  />
                  <TextField
                    id="notes"
                    label="Notes"
                    multiline
                    fullWidth
                    rowsMax="4"
                    value={this.state.form.notes}
                    className={classes.textField}
                    margin="normal"
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDialogToggle} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.addTransaction} color="primary">
                  Done
                </Button>
              </DialogActions>
            </Dialog>
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
