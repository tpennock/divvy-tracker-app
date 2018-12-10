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
import { Provider } from 'react-redux'
import configureStore from './store';
// import registerServiceWorker from './registerServiceWorker';

// Components
import Main from "./components/main";

// material-ui theme overrides
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { divvyGreen, divvyPurple } from './components/colors'

// Divvy theme
const divvyTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: divvyGreen,
    secondary: divvyPurple,
  },
});

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
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
  , 
  document.getElementById('app')
);
// registerServiceWorker();

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"
