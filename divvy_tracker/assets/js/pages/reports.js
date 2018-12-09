import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AreaGraph from '../components/charts/area-graph';
import LineGraph from '../components/charts/line-graph';
import PieGraph from '../components/charts/pie-graph';
import RadialBarGraph from '../components/charts/radial-bar-graph';

const styles = theme => ({
  chartContainer: {
    marginLeft: -22,
  }
});

class Reports extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <CssBaseline />
        <main className={classes.content}>
          <Typography variant="h4" gutterBottom component="h2">
            Reports
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <RadialBarGraph />
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <LineGraph />
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <AreaGraph />
          </Typography>
        </main>
      </div>
    );
  }
}

Reports.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Reports);
