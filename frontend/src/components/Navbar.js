import {
  Dashboard as DashboardIcon,
  Event as EventIcon,
  HealthAndSafety as HealthIcon,
  LocalHospital as HospitalIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: '#1a237e',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  textDecoration: 'none',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    '& .logo-text': {
      color: '#f44336',
    },
    '& .logo-avatar': {
      backgroundColor: '#f44336',
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#00bcd4',
    transform: 'translateY(-2px)',
    '& .MuiSvgIcon-root': {
      color: '#00bcd4',
    },
  },
}));

const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
}));

function Navbar() {
  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoContainer component={RouterLink} to="/">
            <Avatar
              className="logo-avatar"
              sx={{
                bgcolor: '#00bcd4',
                color: 'white',
                width: 40,
                height: 40,
                transition: 'all 0.3s ease',
              }}
            >
              <HealthIcon />
            </Avatar>
            <Typography
              className="logo-text"
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: '.1rem',
                display: { xs: 'none', sm: 'block' },
                color: 'white',
                transition: 'all 0.3s ease',
              }}
            >
              MEDICARE
            </Typography>
          </LogoContainer>

          <NavContainer>
            <NavButton
              component={RouterLink}
              to="/"
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </NavButton>
            <NavButton
              component={RouterLink}
              to="/patients"
              startIcon={<PeopleIcon />}
            >
              Hastalar
            </NavButton>
            <NavButton
              component={RouterLink}
              to="/doctors"
              startIcon={<HospitalIcon />}
            >
              Doktorlar
            </NavButton>
            <NavButton
              component={RouterLink}
              to="/appointments"
              startIcon={<EventIcon />}
            >
              Randevular
            </NavButton>
          </NavContainer>

          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default Navbar; 