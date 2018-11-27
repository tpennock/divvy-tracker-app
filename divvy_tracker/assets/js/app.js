// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import React                            from 'react';  
import ReactDOM                         from 'react-dom';  
// import { createStore, applyMiddleware } from 'redux'  
// import { Provider}                      from 'react-redux'  
// import thunk                            from 'redux-thunk'

// import '../css/app.css'

// import rootReducer from './reducers'

// const store = createStore(  
//   rootReducer,
//   applyMiddleware(thunk)
// )

ReactDOM.render(  
//   <Provider store={store}>
//     <App />
//   </Provider>,
  document.getElementById('root')
);
