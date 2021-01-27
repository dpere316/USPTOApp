// Import Helpers
import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

// Imports of Components here
import Navbar from './components/NavigationBar/navBar';
import ViewPatent from './components/PatentPage/PatentView';
import DashBoard from './components/Dashboard/dashboard';
import SignUp from './components/Signup/signup';
import Login from './components/Login/Login';
import ViewUser from './components/Dashboard/Pages/viewUser';
import Logout from './components/Logout/Logout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Import Styles
import './App.css';


const App = () => {
  
  // Set this into state using react hooks
  const [Auth] = useState(window.localStorage.getItem("isAuthenticated"))
  
  // const ISAUTHENTICATED = window.localStorage.getItem("isAuthenticated");

  return (
    <div>
        <Navbar isAuthed = {Auth}/>
        <Switch>
          <Route exact path="/" />
          <Route path="/Signup" render={(props) => <SignUp {...props} />} />
          <Route path="/Login" render={(props) => <Login {...props} />} />
          <ProtectedRoute exact path="/Patents"   isAuthed = {Auth} component = {ViewPatent}/> 
          <Route exact path="/Logout" render={(props) => <Logout {...props} />} />
          <ProtectedRoute exact path='/dashboard' isAuthed = {Auth} component={DashBoard} />
          <Route path="/Dashboard/ViewUser" render={() => <ViewUser />} />
        </Switch>
      </div>
  );
};

export default App;

