import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import Input from '@material-ui/core/Input';
// import Select from '@material-ui/core/Select';
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

const formErrorMsg = {
  required: 'this field is required',
  date: 'date value needs to be formatted as YYYY-MM-DD',
  amount: 'amount value needs to be formatted as ###.##'
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
        <ValidatorForm 
          id="add-transaction-form" 
          ref="add-transaction-form" 
          autoComplete="off"
          onError={errors => console.log(errors)}
          onSubmit={this.addTransaction}
        >
          <DialogTitle id="add-transaction-form-dialog-title">New Transaction</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter details below to track a new expense.
            </DialogContentText>
            {/* <ValidatorForm 
              id="add-transaction-form" 
              ref="add-transaction-form" 
              className={classes.container} 
              autoComplete="off"
              onError={errors => console.log(errors)}
            > */}
              <TextValidator
                id="name"
                name="name"
                label="Transaction Name*"
                margin="normal"
                fullWidth
                value={this.state.form.name}
                onChange={this.handleChange('name')}
                validators={['required']}
                errorMessages={[formErrorMsg.required]}
              />
              <TextValidator
                id="date"
                name="date"
                label="Date*"
                type="date"
                fullWidth
                value={this.state.form.date}
                onChange={this.handleChange('date')}
                InputLabelProps={{
                  shrink: true,
                }}
                validators={['required']}
                errorMessages={[formErrorMsg.required]}
              />
              <FormControl className={classes.formControl} fullWidth margin="normal">
                <SelectValidator
                  id="category"
                  name="category"
                  label="Category*"
                  value={this.state.form.category}
                  onChange={this.handleChange('category')}
                  validators={['required']}
                  errorMessages={[formErrorMsg.required]}
                >
                  {this.state.categories.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </SelectValidator>
              </FormControl>
              <TextValidator
                id="merchant"
                name="merchant"
                label="Merchant*"
                fullWidth
                margin="normal"
                value={this.state.form.merchant}
                onChange={this.handleChange('merchant')}
                validators={['required']}
                errorMessages={[formErrorMsg.required]}
              />
              <TextValidator
                id="amount"
                name="amount"
                label="Amount*"
                type="number"
                fullWidth
                margin="normal"
                value={this.state.form.amount}
                onChange={this.handleChange('amount')}
                onBlur={this.handleBlur('amount')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                validators={['required']}
                errorMessages={[formErrorMsg.required]}
              />
              <TextValidator
                id="notes"
                name="notes"
                label="Notes*"
                multiline
                fullWidth
                rowsMax="4"
                margin="normal"
                value={this.state.form.notes}
                onChange={this.handleChange('notes')}
                validators={['required']}
                errorMessages={[formErrorMsg.required]}
              />
            {/* </ValidatorForm> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogToggle} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" autoFocus>
              Done
            </Button>
          </DialogActions>
        </ValidatorForm>
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
