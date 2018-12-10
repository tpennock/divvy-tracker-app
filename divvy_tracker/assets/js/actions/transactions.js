import API from '../api';

export const getTransactions = () => {
  return dispatch => {
    API.getTransactions()
    .then(response => {
      if (response.errors)
        dispatch({
          type: "TRANSACTIONS_ERROR",
          errors: response.errors
        })
      else
        dispatch({
          type: "TRANSACTIONS",
          transactions: response.data.transactions
        });
    }).then(error => {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        errors: error
      })
    });
  };
};

export const createTransaction = payload => {
  return dispatch => {
    API.createTransaction(payload)
    .then(response => {
      if (response.errors)
        dispatch({
          type: "TRANSACTIONS_ERROR",
          errors: response.errors
        })
      else
        dispatch({
          type: "TRANSACTIONS",
          transactions: response.data.transactions
        });
    }).then(error => {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        errors: error
      })
    });
  }
};

export const createBatchTransactions = payload => {
  return dispatch => {
    API.createBatchTransactions(payload)
    .then(response => {
      if (response.errors)
        dispatch({
          type: "TRANSACTIONS_ERROR",
          errors: response.errors
        })
      else
        dispatch({
          type: "TRANSACTIONS",
          transactions: response.data.transactions
        });
    }).then(error => {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        errors: error
      })
    });
  };
};

export const deleteTransaction = id => {
  return dispatch => {
    API.deleteTransaction(id)
    .then(response => {
      if (response.errors)
        dispatch({
          type: "TRANSACTIONS_ERROR",
          errors: response.errors
        })
      else
        dispatch({
          type: "TRANSACTIONS",
          transactions: response.data.transactions
        });
    }).then(error => {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        errors: error
      })
    });
  }
};
