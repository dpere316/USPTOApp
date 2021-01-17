// Import Helpers
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// Imports of Components here
import Navbar from './components/NavigationBar/navBar';
import ViewPatent from './components/PatentPage/PatentView';
import DashBoard from './components/Dashboard/dashboard';
import SignUp from './components/Signup/signup';
import Login from './components/Login/Login';
import ViewUser from './components/Dashboard/Pages/viewUser';

// Import Styles
import './App.css';

class App extends Component {


  render(){
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route exact path="/" />
          <Route path="/Signup" component={SignUp} />
          <Route path="/Login" component={Login} />
          <Route exact path="/Patents" render={() => <ViewPatent/>}/> 
          <Route exact path="/Dashboard" render={() => <DashBoard/>}/>
          <Route path="/Dashboard/ViewUser" render={() => <ViewUser/>} />
        </Switch>
      </div>
    );
  }
}

export default App;

