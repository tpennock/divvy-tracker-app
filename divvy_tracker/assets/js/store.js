import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getTransactions } from './actions/transactions';

// createStore
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// on configureStore -> Fetch and store transaction data
store.dispatch(getTransactions());

export default function configureStore(intialState = {}) {
  return store;
}