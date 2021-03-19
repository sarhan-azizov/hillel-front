import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { RouteProps } from "react-router";
import { bool } from 'prop-types';

import { CurrentUserContextType, CurrentUserContext } from '../with-current-user';
import { ROUTES } from '../../../configs';

const GuardedRoute = ({ component: Component, isAuthorize, ...props }: RouteProps & { isAuthorize: boolean, component: any }): JSX.Element => {
  const currentUser: CurrentUserContextType = useContext(CurrentUserContext);
  const authorized = Boolean(currentUser.user.username) && isAuthorize;
  const unauthorized = !Boolean(currentUser.user.username);

  const render = (componentProps:any) => {
    if (isAuthorize === undefined || authorized || (unauthorized && !isAuthorize)) {
      return <Component {...componentProps} />;
    } else if (unauthorized) {
      return <Redirect to={ROUTES.NOT_AUTHORIZED} />
    }
  }

  return (
      <Route {...props} render={render} />
  )
};

GuardedRoute.propTypes = {
  isAuthorize: bool,
}

GuardedRoute.defaultProps = {
  isAuthorize: undefined
}

export { GuardedRoute };
