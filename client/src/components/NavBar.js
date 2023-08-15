import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button
} from 'reactstrap';
import { logout } from './managers/UserManager';

function NavBar(args) {
  
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const currentUser = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand href="/">ElfG</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {currentUser ?
          <h2>{currentUser.username}</h2>
              :""
            }
            <Button onClick={logout}>logout</Button>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar;
