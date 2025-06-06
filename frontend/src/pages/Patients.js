import { Add as AddIcon } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { getPatients, deletePatient } from '../services/api';

function Patients() {
  const location = useLocation();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (location.state?.showNotification) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
    loadPatients();
  }, [location.state]);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const result = await getPatients();
      if (result.success) {
        setPatients(result.data);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Hastalar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (patientId) => {
    if (window.confirm('Bu hastayı silmek istediğinizden emin misiniz?')) {
      try {
        const result = await deletePatient(patientId);
        if (result.success) {
          setPatients(patients.filter(p => p._id !== patientId));
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 5000);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError('Hasta silinirken bir hata oluştu');
      }
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
          İşlem başarıyla tamamlandı!
        </Alert>
      </Collapse>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Hastalar
        </Typography>
        <Button
          component={RouterLink}
          to="/admin/new-patient"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Hasta Ekle
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ad Soyad</TableCell>
              <TableCell>Doğum Tarihi</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient._id}>
                <TableCell>{patient._id}</TableCell>
                <TableCell>{patient.Ad} {patient.Soyad}</TableCell>
                <TableCell>{patient.DogumTarihi ? new Date(patient.DogumTarihi).toLocaleDateString('tr-TR') : ''}</TableCell>
                <TableCell>{patient.TelefonNumarasi}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/patient/${patient._id}`)}
                  >
                    Düzenle
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(patient._id)}
                  >
                    Sil
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

export default Patients; 