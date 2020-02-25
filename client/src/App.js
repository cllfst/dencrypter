import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPAge from './components/main-page/main-page';
import Login from './components/login/Login';
import Register from './components/register/register';

import {BrowserRouter as Router, 
  Route, 
  Switch, 
  Link, 
  Redirect} 
  from "react-router-dom";

function App() {
  return (
    <Router>
      <switch>
        <Route exact path="/" component={MainPAge} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

      </switch>
    </Router>
  );
}

export default App;
