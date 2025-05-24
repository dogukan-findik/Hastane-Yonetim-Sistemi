import {
  AccountCircle,
  Assessment,
  Description,
  EventNote,
  LocalHospital,
  Logout,
  Notifications,
  People,
  Settings,
  Upload,
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

function Navbar({ isDarkMode, isLoggedIn }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // localStorage'dan userInfo'yu oku
  const readUserInfo = () => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      setUserInfo(null);
    }
  };

  // İlk yükleme ve isLoggedIn değiştiğinde userInfo'yu güncelle
  useEffect(() => {
    readUserInfo();
  }, [isLoggedIn]);

  // localStorage değişikliklerini dinle
  useEffect(() => {
    const handleStorageChange = () => {
      readUserInfo();
    };

    window.addEventListener('storage', handleStorageChange);
    // Aynı sekmedeki değişiklikleri de dinle
    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isLoggedIn');
    setUserInfo(null);
    handleClose();
    navigate('/login');
  };

  const handleLogoClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    } else {
      e.preventDefault();
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo?.userType === 'patient') {
        navigate('/appointments');
      } else if (userInfo?.userType === 'doctor') {
        navigate('/patients');
      }
    }
  };

  // Hasta menü öğeleri
  const patientMenuItems = [
    { text: 'Doktorlar', icon: <LocalHospital />, path: '/patient/doctors' },
    { text: 'Randevularım', icon: <EventNote />, path: '/patient/appointments' },
    { text: 'Raporlarım', icon: <Description />, path: '/patient/reports' },
    { text: 'Dosya Yükle', icon: <Upload />, path: '/patient/upload' },
  ];

  // Doktor menü öğeleri
  const doctorMenuItems = [
    { text: 'Hastalarım', icon: <People />, path: '/doctor/patients' },
    { text: 'Randevular', icon: <EventNote />, path: '/doctor/appointments' },
    { text: 'Raporlar', icon: <Description />, path: '/doctor/reports' },
    { text: 'Bildirimler', icon: <Notifications />, path: '/doctor/notifications' },
  ];

  // Yönetici menü öğeleri
  const adminMenuItems = [
    { text: 'Hastalar', icon: <People />, path: '/admin/patients' },
    { text: 'Doktorlar', icon: <LocalHospital />, path: '/admin/doctors' },
    { text: 'Randevular', icon: <EventNote />, path: '/admin/appointments' },
    { text: 'Raporlar', icon: <Assessment />, path: '/admin/reports' },
    { text: 'Bildirimler', icon: <Notifications />, path: '/admin/notifications' },
  ];

  // Kullanıcı tipine göre menü öğelerini seç
  const getMenuItems = () => {
    if (!userInfo || !isLoggedIn) return [];
    
    switch (userInfo.userType) {
      case 'patient':
        return patientMenuItems;
      case 'doctor':
        return doctorMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return [];
    }
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
          onClick={handleLogoClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'white',
            mr: 4,
            cursor: 'pointer',
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

        {isLoggedIn && userInfo && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexGrow: 1,
            justifyContent: 'center',
          }}>
            {getMenuItems().map((item, index) => (
              <Button
                key={index}
                component={RouterLink}
                to={item.path}
                color="inherit"
                startIcon={item.icon}
                sx={{
                  '&:hover': {
                    color: '#40e0d0',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
          {isLoggedIn && userInfo ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>
                {userInfo.name ? userInfo.name : userInfo.email}
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
                  {userInfo.name ? userInfo.name.charAt(0) : userInfo.email?.charAt(0)}
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
                    {userInfo.name ? userInfo.name : userInfo.email}
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
                <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
                  <Logout sx={{ mr: 1, color: '#d32f2f' }} /> Çıkış Yap
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