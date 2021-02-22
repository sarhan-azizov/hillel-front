import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { Provider, CachePolicies } from 'use-http';

import "./styles/main.scss";
import { customTheme } from './theme';
import AppRoutes from "./routes";

const options = {
    cachePolicy: CachePolicies.NO_CACHE,
    headers: {
        Accept: 'application/json'
    }
};

ReactDOM.render(
  <StrictMode>
    <CssBaseline>
        <ThemeProvider theme={customTheme}>
            <Router>
                <Provider url="http://localhost:3000" options={options}>
                    <AppRoutes />
                </Provider>
            </Router>
        </ThemeProvider>
    </CssBaseline>
  </StrictMode>,
  document.getElementById("root")
);
