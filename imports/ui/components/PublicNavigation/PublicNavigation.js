import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () =>
  (<div>
    <Nav>
      <LinkContainer to="/docs">
        <NavItem href="/docs">Docs</NavItem>
      </LinkContainer>
    </Nav>
    <Nav>
      <LinkContainer to="/projects">
        <NavItem href="/projects">Projects</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="/signup">
        <NavItem eventKey={1} href="/signup">
          Sign Up
        </NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem eventKey={2} href="/login">
          Log In
        </NavItem>
      </LinkContainer>
    </Nav>
  </div>);

export default PublicNavigation;
