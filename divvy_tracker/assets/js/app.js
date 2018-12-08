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


// React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//TODO: IMPLEMENT THE STORE AND ALL OF ITS CENTRAL STATE MANAGEMENT GOODNESS
// Store
// import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux'
// import { Provider, connect } from 'react-redux'
// import thunk from 'redux-thunk'

// import rootReducer from './reducers'

// const store = createStore(  
//   rootReducer,
//   applyMiddleware(thunk)
// )

// store.dispatch({
//   type: 'TRANSACTIONS',
// })

// console.log(store.getState())

// material-ui theme overrides
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { green, purple } from './components/colors'

// Divvy theme
const divvyTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: green,
    secondary: purple,
  },
});

// Components
import Main from "./components/main";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={divvyTheme}>
          <Main />
        </MuiThemeProvider>
      </div>
    )
  }
}

ReactDOM.render(
  // <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  // </Provider>
  , 
  document.getElementById('app')
)

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"
