import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { DefaultLayout } from './layout/DefaultLayout';
import Login from './pages/login';

const App = () => (
  <DefaultLayout theme="Hello">
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
  </DefaultLayout>
);

export default App;
