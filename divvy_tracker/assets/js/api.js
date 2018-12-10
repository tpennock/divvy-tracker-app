import axios from 'axios'

const API = {  
  getTransactions: () => {
    return axios.get('http://localhost:4000/api/transactions')
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  },
  createTransaction: (payload) => {
    return axios.post('http://localhost:4000/api/transactions', payload)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  },
  createBatchTransactions: (payload) => {
    return axios.post('http://localhost:4000/api/transactions/batch', payload)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  },
  deleteTransaction: (id) => {
    return axios.delete('http://localhost:4000/api/transactions/' + id)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  },
  updateTransaction: (id, payload) => {
    return axios.put('http://localhost:4000/api/transactions/' + id, payload)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  }
};

export default API;