import React from 'react';
import PropTypes from 'prop-types';
import PapaParse from 'papaparse';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';

import API from '../api';

const styles = theme => ({
  buttonContainer: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

const csvFieldLookup = ["date", "name", "category", "merchant", "amount", "notes"];

class Upload extends React.Component {
  successFunc = (response) => {
    //TODO: IMPLEMENT THE STORE: update store for response.data.transactions
  };

  failFunc = (error) => {
    //TODO: trigger an alert
  };

  render() {
    const { classes } = this.props;

    // upload and parse .csv file
    const handleUpload = e => {
      let reader = new FileReader();
      const filename = e.target.files[0].name;

      reader.onload = event => {
        console.info(event.target.result);
        const csvData = PapaParse.parse(
          event.target.result,
          {
            header: true,
            error: function() {
              console.info("error")
            }  
          }
        );
        console.info(csvData);
        //TODO: save data to db
        // onFileLoaded(csvData.data, filename);
        API.createBatchTransactions(event.target.result)
        .then(response => this.successFunc(response))
        .then(error => this.failFunc(error))
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
            <em>MM/DD/YY,NAME,CATEGORY,MERCHANT,AMOUNT,NOTES</em><br />
            <em>MM/DD/YY,NAME,CATEGORY,MERCHANT,AMOUNT,NOTES</em><br />
            ...
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

export default withStyles(styles)(Upload);