import {
    Dashboard as DashboardIcon,
    Event as EventIcon,
    LocalHospital as HospitalIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hastane Yönetim Sistemi
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/patients"
            startIcon={<PeopleIcon />}
          >
            Hastalar
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/doctors"
            startIcon={<HospitalIcon />}
          >
            Doktorlar
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/appointments"
            startIcon={<EventIcon />}
          >
            Randevular
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 