import { Route, Switch } from "react-router-dom";

import { ROUTES } from "./constants";
import { AuthorizationPage, NotFoundPage, NotAuthorizedPage } from "./pages";
import { GuardedRoute, Navbar } from "./components";
import { Home } from "./pages/Home/Home";
import { Signup } from "./pages/Signup/Signup";

const Routes = () => (
    <Switch>
        <Route path={ROUTES.AUTHORIZATION} render={AuthorizationPage} />
        <Route path={ROUTES.REGISTRATION}>
            <Signup />
        </Route>
        <Route path={ROUTES.NOT_AUTHORIZED}>
            <NotAuthorizedPage />
        </Route>
        <Navbar>
            <GuardedRoute exact path={ROUTES.HOME} component={Home} isAuthorize />
        </Navbar>
        <Route path="*">
            <NotFoundPage />
        </Route>
    </Switch>
);

export default Routes;
