import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { RouteProps } from "react-router";
import { bool } from 'prop-types';

import { CurrentUserContextType, CurrentUserContext } from '../with-current-user';
import { ROUTES } from '../../../configs';

const GuardedRoute = ({ component: Component, isAuthorize, ...props }: RouteProps & { isAuthorize: boolean, component: any }): JSX.Element => {
  const currentUser: CurrentUserContextType = useContext(CurrentUserContext);

  const render = (componentProps:any) => (
      isAuthorize === undefined || Boolean(currentUser.user.username) === isAuthorize
          ? <Component {...componentProps} />
          : <Redirect to={ROUTES.AUTHORIZATION} />
  )

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
