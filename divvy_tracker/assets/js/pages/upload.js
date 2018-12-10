import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import PapaParse from 'papaparse';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';

import { createBatchTransactions } from '../actions/transactions';

const styles = theme => ({
  buttonContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  createBatchTransactions: payload => dispatch(createBatchTransactions(payload))
});

const csvFieldLookup = ["date", "name", "category", "merchant", "amount", "notes"];

class Upload extends React.Component {
  render() {
    const { classes } = this.props;

    // upload and parse .csv file
    const handleUpload = e => {
      let reader = new FileReader();
      const filename = e.target.files[0].name;

      reader.onload = event => {
        const csvData = PapaParse.parse(
          event.target.result,
          {
            header: true,
            error: function() {
              console.error("error")
            }  
          }
        );
        this.props.createBatchTransactions({
          transactions: csvData.data
        });
      };

      reader.readAsText(e.target.files[0]);
    };

    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          <Typography variant="h4" gutterBottom component="h2">
            Batch Upload
          </Typography>
          <Typography variant="body1" gutterBottom color="textSecondary">
            Upload an .csv file for bulk transaction importing. Format should match the following:
          </Typography>
          <Typography variant="body2" gutterBottom color="textSecondary">
            <em>date,name,category,merchant,amount,notes</em><br />
            <em>YYYY-MM-DD,NAME,CATEGORY,MERCHANT,AMOUNT,NOTES</em><br />
            <em>YYYY-MM-DD,NAME,CATEGORY,MERCHANT,AMOUNT,NOTES</em><br />
            ...
          </Typography>
          <Typography variant="body2" gutterBottom color="textSecondary">
            Currently {this.props.transactions.transactions.length} items
          </Typography>
          <div className={classes.buttonContainer}>
            <Grid container spacing={32}>
              <Grid item>
                <input
                  accept="text/csv"
                  hidden
                  id="csv-upload"
                  multiple
                  type="file"
                  onChange={e => handleUpload(e)}
                />
                <label htmlFor="csv-upload">
                  <Button variant="contained" color="secondary" component="span">
                    Upload .csv &nbsp;
                    <CloudUploadIcon />
                  </Button>
                </label>
              </Grid>
            </Grid>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

Upload.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Upload);
