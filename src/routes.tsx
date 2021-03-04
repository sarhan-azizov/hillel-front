import React from "react";
import { Route, Switch } from "react-router-dom";

import { ROUTES } from "./configs";
import { HomePage, SignUpPage, SignInPage, NotFoundPage, UnauthorizedPage, GuardedRoute, Navbar } from "./atomic-design";


const Routes = () => (
    <Switch>
        <Route path={ROUTES.SIGN_IN} render={SignInPage} />
        <Route path={ROUTES.SIGN_UP}>
            <SignUpPage />
        </Route>
        <Route path={ROUTES.NOT_AUTHORIZED}>
            <UnauthorizedPage />
        </Route>
        <Navbar>
            <GuardedRoute exact path={ROUTES.HOME} component={HomePage} isAuthorize />
        </Navbar>
        <Route path="*">
            <NotFoundPage />
        </Route>
    </Switch>
);

export default Routes;
