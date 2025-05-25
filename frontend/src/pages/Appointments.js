import { Add as AddIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';

function Appointments() {
  const [randevular, setRandevular] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Tüm kullanıcılar için tüm randevuları çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/randevular/listele');
        setRandevular(response.data);
      } catch (error) {
        console.error('Randevular yüklenirken hata:', error);
      }
    };

    fetchData();
  }, []);

  // Randevu iptal etme
  const handleCancelAppointment = async (randevuID) => {
    try {
      await axios.delete(`http://localhost:5000/api/randevu/sil/${randevuID}`);
      // Listeyi yenile
      const response = await axios.get('http://localhost:5000/api/randevular/listele');
      setRandevular(response.data);
    } catch (error) {
      setError('Randevu iptal edilirken bir hata oluştu');
      console.error('Randevu iptal hatası:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Onaylandı':
        return 'success';
      case 'Beklemede':
        return 'warning';
      case 'İptal Edildi':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Randevular
        </Typography>
        <Button
          component={RouterLink}
          to="/appointments/new"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Yeni Randevu
        </Button>
      </Box>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert severity="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      </Snackbar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hasta</TableCell>
              <TableCell>Doktor</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>Saat</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {randevular.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell>{appointment._id}</TableCell>
                <TableCell>{appointment.HastaAdSoyad}</TableCell>
                <TableCell>{appointment.DoktorAdSoyad}</TableCell>
                <TableCell>
                  {appointment.Tarih
                    ? new Date(appointment.Tarih).toLocaleDateString('tr-TR')
                    : ''}
                </TableCell>
                <TableCell>{appointment.Saat}</TableCell>
                <TableCell>
                  <Chip
                    label={appointment.Durum}
                    color={getStatusColor(appointment.Durum)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    component={RouterLink}
                    to={`/appointments/edit/${appointment._id}`}
                  >
                    Düzenle
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleCancelAppointment(appointment._id)}
                  >
                    İptal Et
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Appointments; 