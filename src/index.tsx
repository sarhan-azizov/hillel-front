import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AppRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </StrictMode>,
  document.getElementById("root")
);
