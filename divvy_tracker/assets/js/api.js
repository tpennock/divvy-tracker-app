import axios from 'axios'

const API = {  
  getTransactions: () => {
    return axios.get('http://localhost:4000/api/transactions')
      .then(function (response) {
        console.log(response);
        return response;
        // dispatch({
        //   type: "TRANSACTIONS",
        //   transactions: data.transactions
        // });
      })
      .catch(function (error) {
        console.log(error);
        return error;
        // dispatch({
        //   type: "TRANSACTIONS_ERROR",
        //   errors: data.errors
        // })
      });
  },
  createTransaction: (payload) => {
    return axios.post('http://localhost:4000/api/transactions', payload)
      .then(function (response) {
        console.log(response);
        return response;
        // dispatch({
        //   type: "TRANSACTIONS",
        //   transactions: data.transactions
        // });
      })
      .catch(function (error) {
        console.log(error);
        return error;
        // dispatch({
        //   type: "TRANSACTIONS_ERROR",
        //   errors: data.errors
        // })
      });
  },
  createBatchTransactions: (payload) => {
    debugger;
    return axios.post('http://localhost:4000/api/transactions/batch', payload)
      .then(function (response) {
        console.log(response);
        return response;
        // dispatch({
        //   type: "TRANSACTIONS",
        //   transactions: data.transactions
        // });
      })
      .catch(function (error) {
        console.log(error);
        return error;
        // dispatch({
        //   type: "TRANSACTIONS_ERROR",
        //   errors: data.errors
        // })
      });
  },
  deleteTransaction: (id) => {
    debugger;
    return axios.delete('http://localhost:4000/api/transactions/' + id)
      .then(function (response) {
        console.log(response);
        return response;
        // dispatch({
        //   type: "TRANSACTIONS",
        //   transactions: data.transactions
        // });
      })
      .catch(function (error) {
        console.log(error);
        return error;
        // dispatch({
        //   type: "TRANSACTIONS_ERROR",
        //   errors: data.errors
        // })
      });
  },
};

export default API;