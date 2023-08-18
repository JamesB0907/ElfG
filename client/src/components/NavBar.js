import React, { useState } from 'react';
import "./NavBar.css"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from 'reactstrap';
import { logout } from './managers/UserManager';
import { Link } from 'react-router-dom';

function NavBar(args) {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      <Navbar className='navbar-container'{...args}>
        <Link className='navlogo' color='#405436;' to={"/"}>ElfG</Link>
          <Nav className="me-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
            </UncontrolledDropdown>
          </Nav>
          <div className='username-container'> 
           {currentUser ?
          <NavbarText className='username'>{currentUser.username}</NavbarText>
              :""
            }
          </div>
          <NavbarText><Button color='success'onClick={logout}>logout</Button></NavbarText>
      </Navbar>
    </div>
  );
}

export default NavBar
