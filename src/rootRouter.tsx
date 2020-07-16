import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { routesMap } from '@routes/routes';
import { MainContent } from '@components/MainContent/MainContent';
import { Header } from '@components/Header/Header';
import { Footer } from '@components/Footer/Footer';
import { LoginForm } from '@components/LoginForm/LoginForm';

export const Routes = () => (
  <>
    <Header />
    <Switch>
      <Route path={routesMap.login.route} exact={true}>
        <LoginForm />
      </Route>
      <Route path={routesMap.home.route} exact={true}>
        <MainContent />
      </Route>
      <Route
        path={routesMap.tradeID.route}
        exact={true}
        render={(routeProps) => (
          <MainContent match={routeProps.match.params} />
        )}
      />
      <Route component={() => <div>Page Not Found</div>} />
    </Switch>
    <Footer />
  </>
);
