export const setTransactions = (payload) => dispatch => {
  dispatch({
    type: 'TRANSACTIONS',
    payload: payload
  })
}
