import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import Search from 'app/modules/search/search';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import EntitiesRoutes from 'app/entities/routes';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import HorsePage from 'app/modules/horse-page/horse-page';
import BookingManager from 'app/modules/booking-manager/booking-manager';
import BookingPage from 'app/modules/booking-page/booking-page';
import ScrollTop from 'app/shared/scrollToTop/scrollToTop';
import HorseOwnerPage from 'app/modules/horse-owner-page/horse-owner-page';

const loading = <div>loading ...</div>;

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => loading,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => loading,
});

const Routes = () => {
  return (
    <div className="view-routes">
      <ScrollTop>
        <Switch>
          <ErrorBoundaryRoute path="/login" component={Login} />
          <ErrorBoundaryRoute path="/logout" component={Logout} />
          <ErrorBoundaryRoute path="/account/register" component={Register} />
          <ErrorBoundaryRoute path="/account/activate/:key?" component={Activate} />
          <ErrorBoundaryRoute path="/account/reset/request" component={PasswordResetInit} />
          <ErrorBoundaryRoute path="/account/reset/finish/:key?" component={PasswordResetFinish} />
          <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
          <ErrorBoundaryRoute path="/search" exact component={Search} />
          <ErrorBoundaryRoute path="/booking-manager" component={BookingManager} />
          <PrivateRoute path="/account" component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
          <ErrorBoundaryRoute path="/home/horse-owner/:id" exact component={HorseOwnerPage} />
          <ErrorBoundaryRoute path="/home/horse/:id" exact component={HorsePage} />
          <ErrorBoundaryRoute path="/home/booking/:id" exact component={BookingPage} />
          <ErrorBoundaryRoute path="/" exact component={Home} />
          <PrivateRoute path="/" component={EntitiesRoutes} hasAnyAuthorities={[AUTHORITIES.USER]} />
          <ErrorBoundaryRoute component={PageNotFound} />
        </Switch>
      </ScrollTop>
    </div>
  );
};

export default Routes;
