import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HashLink } from 'react-router-hash-link';
import auth from '../../Firebase/Firebase.init';
import logo from '../../images/header-logo.png';
import './NavBar.css'

const NavBar = () => {
  const handleSignOut = () =>{
    signOut(auth);
  }
  const [user] = useAuthState(auth);
    return (
        <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        bg=""
        
      >
        <Container>
          <Navbar.Brand href="/home">
            <img
              src={logo}
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse className="main-nav">
            <Nav.Link className="nav-item1" as={HashLink} to="/home">
              Home
            </Nav.Link>
            <Nav.Link className="nav-item" as={HashLink} to="/services">
              Services
            </Nav.Link>
            <Nav.Link className="nav-item" as={HashLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link className="nav-item" as={HashLink} to="/blog">
              Blogs
            </Nav.Link>
            <Nav.Link className="nav-item" as={HashLink} to="/contact">
              Contact
            </Nav.Link>
            { 
              user?.email ? 
              <>
              <p className="user_display_name ms-auto">{user.displayName|| user.email}</p>
              
              <button className="border-0 bg-light nav-item" onClick={handleSignOut}>SignOut</button>
              </>
              :
           <Nav.Link className="nav-item ms-auto" as={HashLink} to="/logIn">
              LogIn
            </Nav.Link>
            
            }
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default NavBar;