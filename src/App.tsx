import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { DefaultLayout } from './components/layout/DefaultLayout';
import { ReduxTestApp } from './features/counter/ReduxTestApp';

const App = () => (
  <DefaultLayout theme="Hello">
    <Route path="/home">
      <Home />
    </Route>
    <Route path="/login">
      <Auth />
    </Route>
    <Route path="/test">
      <ReduxTestApp />
    </Route>
  </DefaultLayout>
);

export default App;
