import React, { useState, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import {loggedOut} from '../store/usersAction';
import jwt from 'jwt-decode';

const Navbaria = (props) => {     
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  
  const handleLogout = () => {
    localStorage.clear();
    props.loggedOut();
    props.history.push('/login');
  }

  const token  = localStorage.getItem('token');
  let dekode = '';
  if(token){
    dekode = jwt(token)
  }

  

  return (
    <div>
      <Navbar color="dark" dark expand="md" style={{borderBottom:'2px solid #dc3545'}}>
        <NavbarBrand href="/">{props.isLogin ? dekode.username : 'Blocky'}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to='/'>Home</NavLink>
            </NavItem>
            {props.isLogin ? (
            <Fragment>
            <NavItem>
              <NavLink tag={Link} to='/my-blog'>My Blog</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/profile'>Profile</NavLink>
            </NavItem>
            </Fragment>
            ): '' }
          </Nav>
          {props.isLogin ? (
            <Button onClick={handleLogout} outline color="danger">Logout</Button> 
          ):(
            <Fragment>
            <Button className='mr-2' tag={Link} to='/login' outline color="primary">Login</Button>
            <Button tag={Link} to='/register' outline color="success">Register</Button>
            </Fragment>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    isLogin: state.users.isLogged
  }
}
const mapDispatchToProps = dispatch => {
  return{
    loggedOut:()=> dispatch(loggedOut())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbaria));