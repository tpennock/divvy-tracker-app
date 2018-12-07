import React from 'react';
import PropTypes from 'prop-types';
import PapaParse from 'papaparse';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  buttonContainer: {
    marginTop: 32,
    marginBottom: 32
  }
});

class Upload extends React.Component {
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
            error: function() {
              console.info("error")
            }  
          }
        );
        //TODO: save data to db
        // onFileLoaded(csvData.data, filename);
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
            Upload an .csv file for bulk transaction importing
          </Typography>
          <Typography variant="body1" gutterBottom color="textSecondary">
            Format should follow 
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