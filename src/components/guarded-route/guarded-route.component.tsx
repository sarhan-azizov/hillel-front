import React, { ReactComponentElement, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { RouteProps } from "react-router";
import { bool } from 'prop-types';

import { CurrentUserContext, CurrentUserContextType } from '../../context';
import { ROUTES } from '../../constants';

// @ts-ignore
const GuardedRoute = ({ component: Component, isAuthorize, ...props }: RouteProps & { isAuthorize: boolean, component: ReactComponentElement }): JSX.Element => {
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
