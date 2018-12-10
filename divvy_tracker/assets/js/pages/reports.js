import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AreaGraph from '../components/charts/area-graph';
import LineGraph from '../components/charts/line-graph';
import RadialBarGraph from '../components/charts/radial-bar-graph';

const styles = theme => ({
  chartContainer: {
    marginLeft: -22,
  }
});

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
});

class Reports extends React.Component {
  hasData = () => this.props.transactions.transactions.length > 0;

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <main className={classes.content}>
          <Typography variant="h4" gutterBottom component="h2">
            Reports
          </Typography>
          {this.hasData() ? (
            <div>
              <Typography component="div" className={classes.chartContainer}>
                <RadialBarGraph />
              </Typography>
              <Typography component="div" className={classes.chartContainer}>
                <AreaGraph />
              </Typography>
              <Typography component="div" className={classes.chartContainer}>
                <LineGraph />
              </Typography>
            </div>
            ) : (
              <Typography variant="body1" gutterBottom>
                No Transaction data found.
              </Typography>
            )}
        </main>
        
      </div>
    );
  }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Reports);
