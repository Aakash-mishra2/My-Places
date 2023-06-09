import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';
import Button from '../FormElements/Button';
const NavLinks = props => {
  //auth is the object that holds all those properties from values.
  const auth = useContext(AuthContext);

  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
    )}
    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    )}
    {auth.isLoggedIn && (
      <li>
        <Button onClick={auth.logout}>LOGOUT</Button>
      </li>
    )}
  </ul>
};

export default NavLinks;