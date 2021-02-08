import { Route, Switch } from "react-router-dom";
import { HOME_PATH, SIGN_UP_PATH, SIGN_IN_PATH } from "./constants";
import { Signup } from "../pages/Signup/Signup";
import { Home } from "../pages/Home/Home";
import { Navbar } from "../components/Navbar";

const AppRoutes = () => {
  return (
    <Switch>
      <UnAuthRoutes />
      <AuthRoutes />
    </Switch>
  );
};

const UnAuthRoutes = () => (
  <Navbar>
    <Route exact path={HOME_PATH}>
      <Home />
    </Route>
    <Route path={SIGN_UP_PATH}>
      <Signup />
    </Route>
    <Route
      path={SIGN_IN_PATH}
      render={() => (
        <h1 style={{ color: "white", marginTop: "64px" }}>Signin</h1>
      )}
    />
  </Navbar>
);

const AuthRoutes = () => (
  <Route
    path="/secure"
    render={() => {
      return "Secure page";
    }}
  />
);

export { AppRoutes };
