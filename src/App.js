import { STATE_LOGIN, STATE_SIGNUP } from './components/AuthForm';
import GAListener from './components/GAListener';
import EmptyLayout from './layout/EmptyLayout';
import LayoutRoute from './layout/LayoutRoute';
import MainLayout from './layout/MainLayout';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch,Route } from 'react-router-dom';
import './styles/negotiation.css';
import AccountPage from './pages/AccountPage';
import ErrorPage from './components/ErrorPage/ErrorPage';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
             <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
             <LayoutRoute
              exact
              path="/dashboard"
              layout={MainLayout}
              component={DashboardPage}
            />

             <LayoutRoute
              exact
              path="/account"
              layout={MainLayout}
              component={AccountPage}
            />

           <Route path='*' component={ErrorPage} /> 
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
