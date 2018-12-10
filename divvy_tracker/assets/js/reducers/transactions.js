const initialState = {  
  errors: null,
  transactions: []
};

export default function reducer(state = initialState, action = {})  {
  switch (action.type) {
    case 'TRANSACTIONS':
      return {...state, transactions: action.transactions}
    case 'TRANSACTIONS_ERROR':
      return {...state, errors: action.errors}
    default:
      return state;
  }
 };
 