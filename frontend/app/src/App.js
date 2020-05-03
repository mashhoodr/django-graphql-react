import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Dashboard } from './modules/dashboard/Dashboard';
import { Login } from './modules/account/Login';
import { Signup } from './modules/account/Signup';

import { Layout, Menu } from 'antd';

import { UserInfo, CreateUser } from './User'

const { Header, Content, Footer } = Layout;

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  request: async operation => {
    // Get JWT token from local storage
    // Cookie is also configured on the server, to be tested on staging.
    const token = window.localStorage.getItem('token')

    // Pass token to headers
    operation.setContext({
      headers: {
        Authorization: token ? `JWT ${token}` : ''
      }
    })
  }
});

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isUserLoggedIn = window.localStorage.getItem('token')
  return (
    <Route
      {...rest}
      render={props =>
        isUserLoggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: `login`,
                state: { from: rest.path }
              }}
            />
          )
      }
    />
  );
};

const routes = (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <ProtectedRoute
      path="/dashboard"
      component={() => <Dashboard />}
    />
    <Route path="/">
      <Login />
    </Route>
  </Switch>
)

const PageLayout = () => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal"></Menu>
    </Header>
    <Content style={{ padding: '0 50px', height: '100vh' }}>
      {routes}
    </Content>
    <Footer style={{ textAlign: 'center' }}>fun project.</Footer>
  </Layout>
);


const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <PageLayout />
    </Router>
  </ApolloProvider>

);

export default App;
