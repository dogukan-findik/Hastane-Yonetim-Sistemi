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

function Appointments({ isAdminView = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPatient, setIsPatient] = useState(false);

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

  const loadAppointments = () => {
    // Örnek randevu verileri - gerçek uygulamada API'den gelecek
    const mockAppointments = [
      {
        id: 1,
        Hasta: 'Ahmet Yılmaz',
        Doktor: 'Dr. Mehmet Kaya',
        Tarih: '2024-03-25',
        Saat: '10:30',
        Durum: 'Onaylandı'
      },
      {
        id: 2,
        Hasta: 'Ayşe Demir',
        Doktor: 'Dr. Zeynep Şahin',
        Tarih: '2024-03-26',
        Saat: '14:00',
        Durum: 'Beklemede'
      },
      {
        id: 3,
        Hasta: 'Ali Öztürk',
        Doktor: 'Dr. Fatma Yıldız',
        Tarih: '2024-03-27',
        Saat: '09:15',
        Durum: 'İptal Edildi'
      }
    ];
    setAppointments(mockAppointments);
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

  const handleCancelAppointment = (appointmentId) => {
    // Randevu iptal etme işlemi
    setAppointments(prev => 
      prev.map(app => 
        app.id === appointmentId 
          ? { ...app, Durum: 'İptal Edildi' }
          : app
      )
    );
    setSuccess('Randevu başarıyla iptal edildi.');
  };

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
              <TableRow key={appointment.id}>
                <TableCell>{appointment.id}</TableCell>
                {!isPatient && <TableCell>{appointment.Hasta}</TableCell>}
                <TableCell>{appointment.Doktor}</TableCell>
                <TableCell>{appointment.Tarih}</TableCell>
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
                      onClick={() => handleCancelAppointment(appointment.id)}
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