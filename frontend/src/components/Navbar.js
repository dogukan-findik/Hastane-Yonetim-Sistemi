import {
  AccountCircle,
  EventNote,
  LocalHospital,
  Logout,
  People,
  Settings,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Navbar({ isDarkMode }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const storedUserInfo = localStorage.getItem('userInfo');
    
    if (loginStatus === 'true' && storedUserInfo) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // localStorage değişikliklerini dinle
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUserInfo(null);
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: isDarkMode ? '#121212' : '#1a237e',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Toolbar>
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'white',
            mr: 4,
          }}
        >
          <LocalHospital sx={{ fontSize: 40, mr: 1 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #40e0d0 30%, #1a237e 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Medicare
          </Typography>
        </Box>

        {isLoggedIn && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexGrow: 1,
            justifyContent: 'center',
          }}>
            <Button
              component={RouterLink}
              to="/patients"
              color="inherit"
              startIcon={<People />}
              sx={{
                '&:hover': {
                  color: '#40e0d0',
                },
              }}
            >
              Hastalar
            </Button>
            <Button
              component={RouterLink}
              to="/doctors"
              color="inherit"
              startIcon={<LocalHospital />}
              sx={{
                '&:hover': {
                  color: '#40e0d0',
                },
              }}
            >
              Doktorlar
            </Button>
            <Button
              component={RouterLink}
              to="/appointments"
              color="inherit"
              startIcon={<EventNote />}
              sx={{
                '&:hover': {
                  color: '#40e0d0',
                },
              }}
            >
              Randevular
            </Button>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {userInfo?.name}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#40e0d0' }}>
                  {userInfo?.name?.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {userInfo?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userInfo?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userInfo?.role}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
                  <AccountCircle sx={{ mr: 1 }} /> Profil
                </MenuItem>
                <MenuItem component={RouterLink} to="/settings" onClick={handleClose}>
                  <Settings sx={{ mr: 1 }} /> Ayarlar
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} /> Çıkış Yap
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
              startIcon={<AccountCircle />}
              sx={{
                '&:hover': {
                  color: '#40e0d0',
                },
              }}
            >
              Giriş Yap
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 