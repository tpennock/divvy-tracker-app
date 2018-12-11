import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

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

import { transactionCategories } from '../../consts';

import { createTransaction } from '../../store/actions/transactions';

const styles = theme => ({
});

// form data
const newForm = {
  name: '',
  date: format(new Date(), 'YYYY-MM-DD'),
  category: '',
  merchant: '',
  amount: '',
  notes: ''
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  createTransaction: payload => dispatch(createTransaction(payload))
});

class DialogAddTransaction extends React.Component {
  state = {
    categories: [],
    form: {}
  };

  componentDidMount() {
    // intialize state on render 
    // the reason for this is so we can store a clean object for resetting the form on cancel/add
    this.setState(
      { categories: Object.keys(transactionCategories).map(function(key, idx) {
          return {value: key, label: transactionCategories[key]};
        })
      }
    );
    this.resetForm();
  };

  // clear form data
  resetForm() {
    this.setState({ form: newForm });
  };

  // communicate intent to close dialog back to parent via 'props.closeDialog'
  handleDialogToggle = () => {
    this.props.closeDialog();
    this.resetForm();
  };

  addTransaction = () => {
    this.props.createTransaction({
      transaction: this.state.form
    });
    this.handleDialogToggle();
  };

  // onChange: go ahead and set state whenever field values change
  handleChange = name => event => {
    // updating nested state properties is weird
    this.setState({ form: { ...this.state.form, [name]: event.target.value } });
  };

  // onBlur: need to format our data types a bit
  handleBlur = name => event => {
    if (name == "amount") {
      event.target.value = parseFloat(event.target.value).toFixed(2);
    }
    this.setState({ form: { ...this.state.form, [name]: event.target.value } });
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
          <form className={classes.container} autoComplete="off">
            <TextField
              id="name"
              label="Transaction Name"
              className={classes.textField}
              required
              onChange={this.handleChange('name')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="date"
              label="Date"
              type="date"
              required
              fullWidth
              onChange={this.handleChange('date')}
              defaultValue={this.state.form.date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl className={classes.formControl} fullWidth margin="normal">
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                value={this.state.form.category}
                onChange={this.handleChange('category')}
                input={<Input id="category" />}
              >
                {this.state.categories.map(option => (
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
              required
              onChange={this.handleChange('merchant')}
              fullWidth
              margin="normal"
            />
            <TextField
              id="amount"
              label="Amount"
              type="number"
              required
              onChange={this.handleChange('amount')}
              onBlur={this.handleBlur('amount')}
              fullWidth
              className={classes.textField}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
            <TextField
              id="notes"
              label="Notes"
              onChange={this.handleChange('notes')}
              required
              multiline
              fullWidth
              rowsMax="4"
              className={classes.textField}
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.addTransaction} color="primary" autoFocus>
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

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(DialogAddTransaction);
