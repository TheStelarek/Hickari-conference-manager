import React from 'react';
import Register from '../pages/register/Register';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home/Home.jsx';

import styled from 'styled-components';
import Login from '../pages/login/Login.jsx';
import Reset from '../pages/forgotPassword/Reset';
import NotFound from '../pages/notFound/NotFound';

const RegisterForm = styled.div`
  background-color: ${({ theme }) => theme.colors.lightPurple};
  width: 200px;
`;

const UnauthenticatedApp = () => {
  return (
    <RegisterForm>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/reset">
          <Reset />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </RegisterForm>
  );
};

export default UnauthenticatedApp;
