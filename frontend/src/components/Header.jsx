import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; 
import { logOut } from '../redux/authSlice';
import { selectCurrentUser } from '../redux/authSlice';

const Header = () => {
  const userInfo = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <header>
      <Navbar 
        style={{ backgroundColor: '#4E342E' }} // Rich Brown
        variant="dark" 
        expand="lg" 
        collapseOnSelect
      >
        <Container>
          {/* Brand Logo/Name - Links to Home */}
          <LinkContainer to="/">
            <Navbar.Brand style={{ color: '#D4A373', fontWeight: 'bold' }}>
              Rojacks Restaurant
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"> {/* ms-auto pushes nav to the right */}
              
              <LinkContainer to="/menu">
                <Nav.Link>Menu</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/">
                <Nav.Link>Book a Table</Nav.Link>
              </LinkContainer>

              {/* Admin Links */}
              {userInfo ? (
                <NavDropdown title={userInfo.username || 'Admin'} id="adminmenu">
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Manage Bookings</NavDropdown.Item>
                  </LinkContainer>
                  
                  {/* --- ADDED THIS LINK --- */}
                  <LinkContainer to="/admin/menu">
                    <NavDropdown.Item>Manage Menu</NavDropdown.Item>
                  </LinkContainer>
                  {/* --- END OF NEW LINK --- */}

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>Admin Login</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;