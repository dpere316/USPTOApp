import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const navBar = (props) => {
  return (
    <div>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Navbar.Brand href="/">Patentify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {displayLogout(props.isAuthed, props.role)}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
function displayLogout(AuthStatus, Role) {
  if (AuthStatus) {
    if(Role === 'admin')
    {
      return (
        <Nav className="ml-auto">
        <Nav.Link className="active" as={Link} to="/Home">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/Patents">
          Patents
        </Nav.Link>
        <Nav.Link as={Link} to="/Dashboard">
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/Logout">
          Logout
        </Nav.Link>
      </Nav>
      );
    }
    else if(Role === 'annotator')
    {
      return (
        <Nav className="ml-auto">
        <Nav.Link className="active" as={Link} to="/Home">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/Patents">
          Patents
        </Nav.Link>
        <Nav.Link as={Link} to="/Logout">
          Logout
        </Nav.Link>
      </Nav>
      );
    }
    
  } 
  else {
    return (
      <Nav className="ml-auto">
      <Nav.Link className="active" as={Link} to="/Home">
          Home
      </Nav.Link>
        <Nav.Link as={Link} to="/Signup">
          SignUp
        </Nav.Link>
        <Nav.Link as={Link} to="/Login">
          Login
        </Nav.Link>
      </Nav>
    );
  }
}


export default navBar;
