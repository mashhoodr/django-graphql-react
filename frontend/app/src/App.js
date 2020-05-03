import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Dashboard } from './modules/dashboard/Dashboard';
import { Login } from './modules/account/Login';
import { Signup } from './modules/account/Signup';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
});

const routes = (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
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
