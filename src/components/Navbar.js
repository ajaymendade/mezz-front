import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isSmallScreen = window.innerWidth <= 600;
  const history = useHistory();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogoutClick = () => {
    handleLogout();
    history.push('/login');
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          {isSmallScreen && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
          >
            Mezzpro
          </Typography>
          {isLoggedIn ? (
            <>
              <IconButton color="inherit" component={Link} to="/dashboard">
                <HomeIcon />
              </IconButton>
              <IconButton color="inherit" component={Link} to="/profile">
                <AccountCircleIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogoutClick}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (

            <>
              <Button component={Link} to="/register" color="inherit" startIcon={<AccountCircleIcon />}>
                Register
              </Button>
              <Button component={Link} to="/login" color="inherit" startIcon={<LoginIcon />}>
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
