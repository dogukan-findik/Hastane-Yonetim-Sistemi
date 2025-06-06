import { Add as AddIcon } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAppointments, deleteAppointment } from '../services/api';

function Appointments({ isAdminView = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPatient, setIsPatient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kullanıcı rolünü belirle
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    setIsPatient(userInfo.role === 'patient');

    // Bildirim gösterme kontrolü
    if (location.state?.showNotification) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }

    // Randevuları yükle
    loadAppointments();
  }, [location.state]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const result = await getAppointments(userInfo._id, userInfo.role);

      if (result.success) {
        setAppointments(result.data);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Randevular yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
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

  const handleNewAppointment = () => {
    navigate('/new-appointment');
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const result = await deleteAppointment(appointmentId);
      if (result.success) {
        setAppointments(prev =>
          prev.map(app =>
            app._id === appointmentId
              ? { ...app, Durum: 'İptal Edildi' }
              : app
          )
        );
        setSuccess('Randevu başarıyla iptal edildi.');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Randevu iptal edilirken bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Yükleniyor...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Collapse in={showNotification}>
        <Alert
          severity="success"
          sx={{
            mb: 2,
            fontSize: '1.1rem',
            '& .MuiAlert-icon': {
              fontSize: '2rem'
            }
          }}
        >
          Randevu talebiniz başarıyla alınmıştır.
        </Alert>
      </Collapse>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {isAdminView ? 'Tüm Randevular' : (isPatient ? 'Randevularım' : 'Randevular')}
        </Typography>

        {isPatient && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewAppointment}
          >
            Yeni Randevu
          </Button>
        )}
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
              {!isPatient && <TableCell>Hasta</TableCell>}
              <TableCell>Doktor</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell>Saat</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell>{appointment._id}</TableCell>
                {!isPatient && <TableCell>{appointment.Hasta?.Ad} {appointment.Hasta?.Soyad}</TableCell>}
                <TableCell>{appointment.Doktor?.Ad} {appointment.Doktor?.Soyad}</TableCell>
                <TableCell>{new Date(appointment.Tarih).toLocaleDateString('tr-TR')}</TableCell>
                <TableCell>{appointment.Saat}</TableCell>
                <TableCell>
                  <Chip
                    label={appointment.Durum}
                    color={getStatusColor(appointment.Durum)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {appointment.Durum !== 'İptal Edildi' && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleCancelAppointment(appointment._id)}
                    >
                      İptal Et
                    </Button>
                  )}
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