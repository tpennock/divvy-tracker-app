import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { uniqueId } from 'recharts/lib/util/DataUtils';

const styles = theme => ({
});

// form data
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

class DialogAddTransaction extends React.Component {
  state = {
    name: '',
    date: format(new Date(), 'YYYY-MM-DD'),
    category: '',
    merchant: '',
    amount:'',
    notes: ''
  };

  componentDidMount() {
    const newState = this.state;
  }

  // communicate intent to close dialog back to parent via 'props.closeDialog'
  handleDialogToggle = () => {
    this.props.closeDialog();
    this.setState(newState); // clear form data
  };

  addTransaction = () => {
    this.handleDialogToggle();
    //TODO: save transaction data
  };

  handleChange = name => event => {
    console.info(this.state, name, event.target.value)
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    
    return (
      <Dialog
        ref="dialog-add-transaction"
        fullWidth={true}
        open={this.props.open}
        onClose={this.handleDialogToggle}
        aria-labelledby="add-transaction-form-dialog-title"
      >
        <DialogTitle id="add-transaction-form-dialog-title">New Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter details below to track a new expense.
          </DialogContentText>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="name"
              label="Name"
              fullWidth
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="date"
              label="Date"
              type="date"
              fullWidth
              defaultValue={this.state.date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl className={classes.formControl} fullWidth margin="normal">
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange('category')}
                input={<Input id="category" />}
              >
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="merchant"
              label="Merchant"
              className={classes.textField}
              fullWidth
              margin="normal"
            />
            <TextField
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              className={classes.textField}
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
    );
  }
}

DialogAddTransaction.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogAddTransaction);