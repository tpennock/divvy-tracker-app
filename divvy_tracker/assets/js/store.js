import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import API from './api';
import { setTransactions } from './actions/transactions';

// createStore
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// on configureStore -> Fetch and store transaction data
API.getTransactions()
  .then(response => {
    console.info(response.data.transactions)
    store.dispatch(setTransactions(response.data.transactions))
  })
  .then(error => {
    //TODO: trigger an alert
  });

export default function configureStore(intialState = {}) {
  return store;
}