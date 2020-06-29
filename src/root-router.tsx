import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routesMap } from '../src/constants';
import { MainContainer, HeaderContainer, FooterContainer, LoginContainer } from 'containers';

export const Routes: React.FC = () => {
  return (
    <>
      <HeaderContainer />
      <Switch>
        <Route
          path={routesMap.Login.route}
          exact={routesMap.Login.exact}
          render={routeProps => (
            <LoginContainer />
          )}
        />
        <Route
          path={routesMap.Home.route}
          exact={routesMap.Home.exact}
          render={routeProps => (
            <MainContainer />
          )}
        />
        <Route
          path={routesMap.TraidID.route}
          exact={routesMap.TraidID.exact}
          render={routeProps => (
            <MainContainer match={routeProps.match.params} />
          )}
        />
        <Route component={() => <div>Page Not Found</div>} />
      </Switch>
      <FooterContainer />
    </>
  );
};

