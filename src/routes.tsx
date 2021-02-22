import {Route, Switch} from "react-router-dom";

import {HOME_PATH, SIGN_UP_PATH} from "./constants";
import {AuthorizationPage} from "./pages/authorization";
import {Navbar} from "./components";
import {Home} from "./pages/Home/Home";
import {Signup} from "./pages/Signup/Signup";

const Routes = () => (
    <Switch>
      <Route exact path="/authorization" render={AuthorizationPage} />
      <Navbar>
        <Route exact path={HOME_PATH}>
          <Home />
        </Route>
        <Route path={SIGN_UP_PATH}>
          <Signup />
        </Route>
      </Navbar>
    </Switch>
);

export default Routes;
