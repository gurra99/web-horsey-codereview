import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs.ts';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import sv from 'date-fns/locale/sv';
import { setDefaultLocale } from 'react-datepicker';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();
  const horseOwner = useAppSelector(state => state.horseOwner.entity);
  const rider = useAppSelector(state => state.rider.entity);
  setDefaultLocale(sv);

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, []);

  useEffect(() => {
  }, [horseOwner, rider]);

  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);

  return (
    <Router basename={baseHref}>
      <div className={(horseOwner.darkmode || rider.darkmode) ? "appContainer darkMode" : "appContainer"}>
        <ToastContainer position={toast.POSITION.TOP_LEFT} />
        <ErrorBoundary>
          <Header
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            currentLocale={currentLocale}
            ribbonEnv={ribbonEnv}
            isInProduction={isInProduction}
            isOpenAPIEnabled={isOpenAPIEnabled}
          />
        </ErrorBoundary>
        <div className="viewContainer">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
