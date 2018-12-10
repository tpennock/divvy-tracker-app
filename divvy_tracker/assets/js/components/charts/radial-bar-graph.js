import React from 'react';
import { connect } from 'react-redux'
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

import { transactionCategories } from '../../consts'
import { convertObjToArray } from '../../utils'
import { divvyGreen, divvyPurple } from '../colors'

import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import teal from '@material-ui/core/colors/teal';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import deepPurple from '@material-ui/core/colors/deepPurple';
import cyan from '@material-ui/core/colors/cyan';
import lime from '@material-ui/core/colors/lime';
import deepOrange from '@material-ui/core/colors/deepOrange';

const fills = [
  yellow[500],
  indigo[500],
  divvyGreen.main,
  teal[500],
  pink[500],
  red[500],
  blue[500],
  divvyPurple.main,
  green[500],
  deepPurple[500],
  cyan[500],
  lime[500],
  deepOrange[500]
]
    
const style = {
  top: 0,
  left: 350,
  lineHeight: '24px'
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
});

class RadialBarGraph extends React.Component {
  state = {
  }

  render() {
    // group transaction data into categories
    function groupBy(objectArray, property) {
      return objectArray.reduce(function (acc, obj) {
        let key = obj[property];
        if (!acc[key]) {
          acc[key] = {
            total: parseFloat(obj.amount),
            name: transactionCategories[obj.category],
            fill: fills[Object.keys(acc).length]
          };
        }
        // man, floats make things complicated
        acc[key].total = (parseFloat(acc[key].total) + parseFloat(obj.amount)).toFixed(2);
        return acc;
      }, {});
    }

    function sortLoToHi(a, b) {
      // like I said... floats :p
      const totalA = parseFloat(a.total);
      const totalB = parseFloat(b.total);
    
      let comparison = 0;
      if (totalA > totalB) {
        comparison = 1;
      } else if (totalA < totalB) {
        comparison = -1;
      }
      return comparison;
    };
    
    var chartData = convertObjToArray(groupBy(this.props.transactions.transactions, 'category'));
    chartData.sort(sortLoToHi); // sort the list from least -> greatest totals

    return (
      <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={chartData}>
        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise={true} dataKey='total'/>
        <Legend iconSize={10} width={300} height={300} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
        <Tooltip />
      </RadialBarChart>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RadialBarGraph);
