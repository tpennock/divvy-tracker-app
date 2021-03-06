import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux'
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
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CodeIcon from '@material-ui/icons/Code';
// import EditIcon from '@material-ui/icons/Edit';
// import { lighten } from '@material-ui/core/styles/colorManipulator';

import DialogAddTransaction from '../components/dialogs/dialog-add-transaction';
import DialogAlert from '../components/dialogs/dialog-alert';

import { transactionCategories } from '../consts'
import { convertCurrencyAsRomanNumeral } from '../utils'

import { deleteTransaction } from '../store/actions/transactions';

const styles = theme => ({
  paper: {
    marginBottom: theme.spacing.unit * 3
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  fab: {
    position: 'absolute',
    // bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  }
});

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  deleteTransaction: id => dispatch(deleteTransaction(id))
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
const rows = [
  { id: 'id', numeric: true, label: 'ID' },
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'date', numeric: false, label: 'Date' },
  { id: 'category', numeric: false, label: 'Category' },
  { id: 'merchant', numeric: false, label: 'Merchant' },
  { id: 'amount', numeric: true, label: 'Amount' },
  { id: 'notes', numeric: false, label: 'Notes' },
  { id: 'options', numeric: false, component: Button, label: 'Options' },
];

class Dashboard extends React.Component {
  state = {
    dialogAddOpen: false, // this controls add dialog visibility and will be passed -> child dialog
    dialogAlertOpen: false, // this controls alert dialog visibility and will be passed -> child dialog
    deleteId: 0,
    romanNumerals: false,
    order: 'desc',
    orderBy: 'date',
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

  // setState for page
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  // setState for rowsPerPage
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleAddDialogToggle = () => {
    this.setState(state => ({ dialogAddOpen: !state.dialogAddOpen }));
  };

  handleAlertDialogToggle = (id) => {
    this.setState({ deleteId: id });
    this.setState(state => ({ dialogAlertOpen: !state.dialogAlertOpen }));
  };

  handleDelete = (id) => {
    this.props.deleteTransaction(id);
  }

  // wrapper call to create our sort handler -> Render methods should be a pure function of props and state.
  createSortHandler = property => event => {
    this.handleSort(event, property);
  };

  // toggle to show currency as Roman numerals
  toggleRomanNumerals = () => {
    this.setState(state => ({ romanNumerals: !state.romanNumerals }));
  };

  // checks whether to translate -> Roman Numerals -> returns currency value
  getCurrency = currency => this.state.romanNumerals ? convertCurrencyAsRomanNumeral(currency) : currency;
  
  // return the label for a matching category value
  getCategoryLabel = category => transactionCategories[category];

  hasData = () => this.props.transactions.transactions.length > 0;

  render() {
    const { classes } = this.props;
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.props.transactions.transactions.length - this.state.page * this.state.rowsPerPage);

    return (
      <div>
        <CssBaseline />
        <main>
          <Typography variant="h4" gutterBottom component="h2">
            Dashboard
            <Fab color="primary" aria-label="Add" size="small" className={classes.fab} onClick={this.handleAddDialogToggle}>
              <AddIcon />
            </Fab>
          </Typography>
          <div>
            {this.hasData() ? (
            <Paper className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {rows.map(row => {
                      return (
                        <TableCell
                          key={row.id}
                          numeric={row.numeric}
                          padding="dense"
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
                  {stableSort(this.props.transactions.transactions, getSorting(this.state.order, this.state.orderBy))
                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                    .map(n => {
                      return (
                        <TableRow key={n.id} className={classes.row}>
                          <TableCell padding="dense" numeric>{n.id}</TableCell>
                          <TableCell padding="dense">{n.name}</TableCell>
                          <TableCell padding="dense">{n.date}</TableCell>
                          <TableCell padding="dense">{this.getCategoryLabel(n.category)}</TableCell>
                          <TableCell padding="dense">{n.merchant}</TableCell>
                          <TableCell padding="dense" numeric>{this.getCurrency(n.amount)}</TableCell>
                          <TableCell padding="dense">{n.notes}</TableCell>
                          <TableCell padding="dense">
                            <IconButton 
                              color="secondary" 
                              aria-label="Delete" 
                              size="small"
                              onClick={() => this.handleAlertDialogToggle(n.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                            {/* //TODO: edit transactions */}
                            {/* <IconButton 
                              color="secondary" 
                              aria-label="Edit" 
                              size="small"
                              component="a" 
                              href={"/api/transactions/" + n.id + "/edit"}
                              target="blank"
                            >
                              <EditIcon />
                            </IconButton> */}
                            <Tooltip title={"View data for transaction ID: " + n.id} classes={{ tooltip: classes.lightTooltip }}>
                              <IconButton 
                                color="secondary" 
                                aria-label="View transaction data" 
                                size="small"
                                component="a" 
                                href={"/api/transactions/" + n.id}
                                target="blank"
                              >
                                <CodeIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
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
                count={this.props.transactions.transactions.length}
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
            ) : (
              <Typography variant="body1" gutterBottom>
                No Transaction data found. Be the first to add an expense item by clicking on the "+" button.
              </Typography>
            )}
            {this.hasData() &&
              <Button 
                color="secondary" 
                variant="contained" 
                aria-label="Show Roman Numerals" 
                size="small" 
                className={classes.fab} 
                onClick={this.toggleRomanNumerals}>
                  {this.state.romanNumerals ? "Hide" : "Show"} Roman Numerals
              </Button>
            }
            <DialogAddTransaction 
              open={this.state.dialogAddOpen}
              closeDialog={this.handleAddDialogToggle}
            />
            <DialogAlert 
              open={this.state.dialogAlertOpen}
              alertTitle={"Delete?"}
              alertDesc={"This action can't be undone. Please confirm that you'd like to delete this transaction."}
              confirm={() => this.handleDelete(this.state.deleteId)} 
              closeDialog={this.handleAlertDialogToggle} 
            />
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Dashboard);
