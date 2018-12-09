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

const styles = theme => ({
});

class DialogAlert extends React.Component {
  state = {};

  // communicate intent to close dialog back to parent via 'props.closeDialog'
  cancel = () => {
    this.props.closeDialog();
  };

  confirm = () => {
    this.props.closeDialog();
    this.props.confirm();
  };

  render() {
    const { classes } = this.props;

    console.info(this.props);
    
    return (
      <Dialog
          ref="alert-dialog"
          fullWidth={true}
          open={this.props.open}
          onClose={this.cancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{this.props.alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.alertDesc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.confirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DialogAlert.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogAlert);
