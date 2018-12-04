// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../styles/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { createStore, applyMiddleware } from 'redux'  
// import { Provider}                      from 'react-redux'  
// import thunk                            from 'redux-thunk'

// import rootReducer from './reducers'

// const store = createStore(  
//   rootReducer,
//   applyMiddleware(thunk)
// )

// Components
import Main from "./components/main.js";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Main />
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>, 
  document.getElementById('root')
)

// Render(( 
//   <Provider store={store}>
//     <App />
//   </Provider>
// ), document.getElementById('root'))

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"
