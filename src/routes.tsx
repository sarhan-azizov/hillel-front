import React from "react";
import { Route, Switch } from "react-router-dom";

import { ROUTES } from "./configs";
import { HomePage, SignUpPage, SignInPage, NotFoundPage, UnauthorizedPage, GuardedRoute } from "./atomic-design";


const Routes = () => (
    <Switch>
        <Route path={ROUTES.SIGN_IN} render={SignInPage} />
        <Route path={ROUTES.SIGN_UP} render={SignUpPage} />
        <Route path={ROUTES.NOT_AUTHORIZED} render={UnauthorizedPage} />
        <GuardedRoute exact path={ROUTES.HOME} component={HomePage} isAuthorize />
        <Route path="*" render={NotFoundPage} />
    </Switch>
);

export default Routes;
