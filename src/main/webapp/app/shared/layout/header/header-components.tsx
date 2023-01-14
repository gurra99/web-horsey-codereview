import React from 'react';
import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="../../../../content/images/faviconh.ico" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <span className="brand-title">
      <Translate contentKey="global.title">Horsey</Translate>
    </span>
    <span className="navbar-version">{VERSION}</span>
  </NavbarBrand>
);

export const Search = () => (
  <NavItem>
    <NavLink tag={Link} to="/search" className="d-flex align-items-center">
      <FontAwesomeIcon icon="search" />
      Search
    </NavLink>
  </NavItem>
);

export const BookingManager = () => (
  <NavItem>
    <NavLink tag={Link} to="/booking-manager" className="d-flex align-items-center">
      <FontAwesomeIcon icon="pencil" />
      Booking Manager
    </NavLink>
  </NavItem>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);
