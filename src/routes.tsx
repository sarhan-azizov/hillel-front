import React from "react";
import { Route, Switch } from "react-router-dom";

import { ROUTES } from "./configs";
import { DashboardPage, ChangePasswordPage, SignUpPage, SignInPage, NotFoundPage, UnauthorizedPage, GuardedRoute, UsersPage, ForbiddenPage } from "./atomic-design";


const Routes = () => (
    <Switch>
        <Route path={ROUTES.SIGN_IN} render={SignInPage} />
        <Route path={ROUTES.SIGN_UP} render={SignUpPage} />
        <GuardedRoute path={ROUTES.USERS} isAuthorize component={UsersPage} />
        <GuardedRoute path={ROUTES.CHANGE_PASSWORD} isAuthorize component={ChangePasswordPage} />
        <Route path={ROUTES.NOT_AUTHORIZED} render={UnauthorizedPage} />
        <GuardedRoute exact path={ROUTES.DASHBOARD} component={DashboardPage} isAuthorize />
        <GuardedRoute exact path={ROUTES.FORBIDDEN} component={ForbiddenPage} isAuthorize />
        <Route path="*" render={NotFoundPage} />
    </Switch>
);

export default Routes;
