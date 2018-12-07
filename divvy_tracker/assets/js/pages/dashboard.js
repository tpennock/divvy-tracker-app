import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
// import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
// import Button from '@material-ui/core/Button';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import { lighten } from '@material-ui/core/styles/colorManipulator';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

import DialogAddTransaction from '../components/dialogs/dialog-add-transaction';

const styles = theme => ({
  table: {
    minWidth: 700,
  },
  fab: {
    position: 'absolute',
    // bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});

// sorting and filtering
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

// data
let id = 0;
function createData(date, name, category, merchant, amount, notes) {
  id += 1;
  return { id, date, name, category, merchant, amount, notes };
}

const rows = [
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
  { id: 'merchant', numeric: false, disablePadding: true, label: 'Merchant' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
  { id: 'notes', numeric: false, disablePadding: false, label: 'Notes' },
];

class Dashboard extends React.Component {
  state = {
    dialogOpen: false, // this controls dialog visibility and will be passed -> child dialog
    order: 'asc',
    orderBy: 'category',
    selected: [],
    data: [
      createData(format(new Date(2018, 6, 21), 'MM/DD/YYYY'), 'Cindy Hawthorne', 'Food', 'Cost Vida', 35.64, ''),
      createData(format(new Date(2018, 7, 29), 'MM/DD/YYYY'), 'Dave Johnson', 'Travel', 'Delta', 458.25, ''),
      createData(format(new Date(2018, 8, 26), 'MM/DD/YYYY'), 'Peter Trimble', 'Food', 'JDawgs', 8.98, ''),
      createData(format(new Date(2018, 9, 2), 'MM/DD/YYYY'), 'Kyle Smith', 'Training', 'Pluralsite', 118.85, ''),
      createData(format(new Date(2018, 10, 14), 'MM/DD/YYYY'), 'Sarah Moore', 'Food', 'Arby\'s', 11.48, ''),
      createData(format(new Date(2018, 10, 5), 'MM/DD/YYYY'), 'Andrew Thomas', 'Office Snacks', 'Costco', 258.54, ''),
      createData(format(new Date(2018, 10, 13), 'MM/DD/YYYY'), 'Andrew Thomas', 'Office Snacks', 'Costco', 258.54, ''),
      createData(format(new Date(), 'MM/DD/YYYY'), 'Andrew Thomas', 'Office Snacks', 'Costco', 258.54, '')
    ],
    page: 0,
    rowsPerPage: 5,
  };

  handleSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  // assigns selected column
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  // setState for page
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  // setState for rowsPerPage
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDialogToggle = () => {
    this.setState(state => ({ dialogOpen: !state.dialogOpen }));
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  // wrapper call to create our sort handler -> Render methods should be a pure function of props and state.
  createSortHandler = property => event => {
    this.handleSort(event, property);
  };

  render() {
    const { classes } = this.props;
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.data.length - this.state.page * this.state.rowsPerPage);

    return (
      <div>
        <CssBaseline />
        <main>
          <Typography variant="h4" gutterBottom component="h2">
            Dashboard
            <Fab color="primary" aria-label="Add" size="small" className={classes.fab} onClick={this.handleDialogToggle}>
              <AddIcon />
            </Fab>
          </Typography>
          <div className={classes.tableContainer}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {rows.map(row => {
                      return (
                        <TableCell
                          key={row.id}
                          numeric={row.numeric}
                          padding={row.disablePadding ? 'none' : 'default'}
                          sortDirection={this.state.orderBy === row.id ? this.state.order : false}
                        >
                          <TableSortLabel
                            active={this.state.orderBy === row.id}
                            direction={this.state.order}
                            onClick={this.createSortHandler(row.id)}
                          >
                            {row.label}
                          </TableSortLabel>
                        </TableCell>
                      );
                    }, this)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(this.state.data, getSorting(this.state.order, this.state.orderBy))
                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                    .map(n => {
                      const isSelected = this.isSelected(n.id);
                      return (
                        <TableRow
                          hover
                          onClick={event => this.handleClick(event, n.id)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.id}
                          selected={isSelected}
                        >
                          <TableCell>{n.date}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            {n.name}
                          </TableCell>
                          <TableCell>{n.category}</TableCell>
                          <TableCell>{n.merchant}</TableCell>
                          <TableCell numeric>{n.amount}</TableCell>
                          <TableCell>{n.notes}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={this.state.data.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Paper>
            <DialogAddTransaction open={this.state.dialogOpen} closeDialog={this.handleDialogToggle} />
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
