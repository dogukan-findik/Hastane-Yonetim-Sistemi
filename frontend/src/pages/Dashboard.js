import {
    Event as EventIcon,
    LocalHospital as HospitalIcon,
    People as PeopleIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e3f2fd',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PeopleIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary">
                Toplam Hasta
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              150
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#fce4ec',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <HospitalIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="secondary">
                Aktif Doktor
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              25
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e8f5e9',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EventIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="success.main">
                Bugünkü Randevu
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              45
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#fff3e0',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <WarningIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="warning.main">
                Bekleyen İşlem
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              12
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 