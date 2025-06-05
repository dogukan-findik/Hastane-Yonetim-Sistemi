import {
    Assignment as AssignmentIcon,
    Event as EventIcon,
    LocalHospital as HospitalIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activeDoctors: 0,
    todayAppointments: 0,
    pendingTasks: 0
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      // İstatistikleri getir
      const statsResponse = await axios.get('http://localhost:5000/api/dashboard/stats');
      setStats(statsResponse.data);

      // Yaklaşan randevuları getir
      const appointmentsResponse = await axios.get('http://localhost:5000/api/randevu/listele');
      const today = new Date();
      const upcoming = appointmentsResponse.data
        .filter(app => new Date(app.tarih) >= today)
        .sort((a, b) => new Date(a.tarih) - new Date(b.tarih))
        .slice(0, 5);
      setUpcomingAppointments(upcoming);

      // Son aktiviteleri getir
      const activitiesResponse = await axios.get('http://localhost:5000/api/dashboard/activities');
      setRecentActivities(activitiesResponse.data);
    } catch (error) {
      console.error('Dashboard veri getirme hatası:', error);
      setError('Veriler yüklenirken bir hata oluştu');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const dashboardStats = [
    {
      title: 'Toplam Hasta',
      value: stats.totalPatients.toString(),
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
      color: '#e3f2fd',
    },
    {
      title: 'Aktif Doktorlar',
      value: stats.activeDoctors.toString(),
      icon: <HospitalIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
      color: '#e8f5e9',
    },
    {
      title: 'Bugünkü Randevular',
      value: stats.todayAppointments.toString(),
      icon: <EventIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
      color: '#fff3e0',
    },
    {
      title: 'Bekleyen İşlemler',
      value: stats.pendingTasks.toString(),
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
      color: '#fce4ec',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        {/* İstatistik Kartları */}
        {dashboardStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                bgcolor: 'background.paper',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      bgcolor: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ mb: 1, color: 'text.primary' }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 'medium' }}
                >
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Grafik ve Tablo Alanları */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 400,
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'text.primary', fontWeight: 'bold' }}
            >
              Hasta İstatistikleri
            </Typography>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
              }}
            >
              Grafik burada görüntülenecek
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 400,
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'text.primary', fontWeight: 'bold' }}
            >
              Yaklaşan Randevular
            </Typography>
            <List>
              {upcomingAppointments.map((appointment) => (
                <React.Fragment key={appointment._id}>
                  <ListItem>
                    <ListItemText
                      primary={`${appointment.hastaAdi} - ${appointment.doktorAdi}`}
                      secondary={`${new Date(appointment.Tarih).toLocaleDateString('tr-TR')} ${appointment.saat}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Alt Bilgi Kartları */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'text.primary', fontWeight: 'bold' }}
            >
              Son Aktiviteler
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={activity.title}
                      secondary={activity.timestamp}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'text.primary', fontWeight: 'bold' }}
            >
              Hızlı İşlemler
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                component={RouterLink}
                to="/appointments/new"
                variant="contained"
                color="primary"
                fullWidth
              >
                Yeni Randevu
              </Button>
              <Button
                component={RouterLink}
                to="/patients/new"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Yeni Hasta
              </Button>
              <Button
                component={RouterLink}
                to="/reports"
                variant="contained"
                color="info"
                fullWidth
              >
                Raporlar
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 