import {
    Assignment as AssignmentIcon,
    Event as EventIcon,
    LocalHospital as HospitalIcon,
    People as PeopleIcon,
} from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';

function Dashboard() {
  const stats = [
    {
      title: 'Toplam Hasta',
      value: '1,234',
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
      color: '#e3f2fd',
    },
    {
      title: 'Aktif Doktorlar',
      value: '45',
      icon: <HospitalIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
      color: '#e8f5e9',
    },
    {
      title: 'Bugünkü Randevular',
      value: '28',
      icon: <EventIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
      color: '#fff3e0',
    },
    {
      title: 'Bekleyen İşlemler',
      value: '12',
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
      color: '#fce4ec',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* İstatistik Kartları */}
        {stats.map((stat, index) => (
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
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
              }}
            >
              Randevu listesi burada görüntülenecek
            </Box>
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
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
              }}
            >
              Aktivite listesi burada görüntülenecek
            </Box>
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
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
              }}
            >
              Hızlı işlem butonları burada görüntülenecek
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 