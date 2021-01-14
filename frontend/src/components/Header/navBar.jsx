import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link} from "react-router-dom";


class navBar extends Component {

  render(){
    return (      
      <Navbar bg="primary" expand="lg" variant="dark">
        <Navbar.Brand href="/">
          Patent App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
         <Nav.Link className="active" as={Link} to="/Home" >  Home </Nav.Link> 
          <Nav.Link  as={Link} to="/Patents">Patents</Nav.Link>
          <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/Login">Login</Nav.Link>

        </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default navBar;
