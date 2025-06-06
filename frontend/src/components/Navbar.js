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
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

function Navbar({ isDarkMode, isLoggedIn }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // localStorage'dan userInfo'yu oku
  const readUserInfo = () => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      console.log('Stored userInfo:', parsedUserInfo); // Debug için
      setUserInfo(parsedUserInfo);
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
    localStorage.removeItem('token');
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
      if (userInfo?.role === 'patient') {
        navigate('/patient/appointments');
      } else if (userInfo?.role === 'doctor') {
        navigate('/doctor/patients');
      } else if (userInfo?.role === 'admin') {
        navigate('/admin/patients');
      }
    }
  };

  // Hasta menü öğeleri
  const patientMenuItems = [
    { text: 'Randevularım', icon: <EventNote />, path: '/patient/appointments' },
    { text: 'Raporlarım', icon: <Description />, path: '/patient/reports' },
    { text: 'Doktorlar', icon: <LocalHospital />, path: '/patient/doctors' },
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
    console.log('Current userInfo:', userInfo); // Debug için
    if (!userInfo || !isLoggedIn) return [];
    
    // Rol kontrolü - userType veya role property'sini kontrol et
    const userRole = userInfo.userType || userInfo.role || userInfo.Rol;
    console.log('User role:', userRole); // Debug için
    
    switch (userRole?.toLowerCase()) {
      case 'patient':
      case 'hasta':
        return patientMenuItems;
      case 'doctor':
      case 'doktor':
        return doctorMenuItems;
      case 'admin':
      case 'yönetici':
        return adminMenuItems;
      default:
        console.log('No matching role found'); // Debug için
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
              background: 'linear-gradient(45deg, #40e0d0 30%, #ffffff 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Medicare
          </Typography>
        </Box>

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
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  backgroundColor: '#40e0d0',
                  transform: location.pathname === item.path ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                },
                backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: location.pathname === item.path 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isLoggedIn && userInfo ? (
            <>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
                {userInfo.Ad ? `${userInfo.Ad} ${userInfo.Soyad}` : userInfo.Email}
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
                  {userInfo.Ad ? userInfo.Ad.charAt(0) : userInfo.Email?.charAt(0)}
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
                    {userInfo.Ad ? `${userInfo.Ad} ${userInfo.Soyad}` : userInfo.Email}
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
            </>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
              startIcon={<AccountCircle />}
              sx={{
                color: 'white',
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