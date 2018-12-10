import React from 'react';
import { connect } from 'react-redux'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import AreaChart from 'recharts/lib/chart/AreaChart';
import Area from 'recharts/lib/cartesian/Area';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

import { divvyGreen, divvyPurple } from '../colors'
import { convertObjToArray, monthNameToNum } from '../../utils'

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
});

class AreaGraph extends React.Component {
  state = {
  }

  render() {
    // group transaction data into months
    function groupBy(objectArray, property) {
      return objectArray.reduce(function (acc, obj) {
        let key = format(new Date(obj[property]), 'MMMM');
        //todo: get month as key

        if (!acc[key]) {
          acc[key] = {
            name: key,
            count: 0,
            total: parseFloat(obj.amount)
          };
        }

        // man, floats make things complicated
        acc[key].total = (parseFloat(acc[key].total) + parseFloat(obj.amount)).toFixed(2);
        acc[key].count++;
        return acc;
      }, {});
    }

    function sortOldToNew(a, b) {
      const monthA = monthNameToNum(a.name);
      const monthB = monthNameToNum(b.name);
    
      let comparison = 0;
      if (monthA > monthB) {
        comparison = 1;
      } else if (monthA < monthB) {
        comparison = -1;
      }
      return comparison;
    };
    
    var chartData = convertObjToArray(groupBy(this.props.transactions.transactions, 'date'));
    chartData.sort(sortOldToNew); // sort the list from oldest -> newest months

    return (
      // 99% per https://github.com/recharts/recharts/issues/172
      <ResponsiveContainer width="99%" height={320}>
        <AreaChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="total" stroke={divvyGreen.main} fill={divvyGreen.main} stackId="1" />
          {/* <Area type="monotone" dataKey="count" stroke={divvyPurple.main} fill={divvyPurple.main} stackId="1" activeDot={{ r: 8 }} /> */}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaGraph);
