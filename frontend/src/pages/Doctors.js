import {
  Box,
  Button,
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
  Snackbar
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors } from '../services/api';

function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const result = await getDoctors();
      if (result.success) {
        setDoctors(result.data);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Doktorlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = () => {
    navigate('/add-doctor');
  };

  const handleViewDoctor = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Doktorlar
        </Typography>
        <Button
          variant="contained"
          onClick={handleAddDoctor}
        >
          Yeni Doktor Ekle
        </Button>
      </Box>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ad</TableCell>
              <TableCell>Soyad</TableCell>
              <TableCell>Uzmanlık Alanı</TableCell>
              <TableCell>Çalıştığı Hastane</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor._id}>
                <TableCell>{doctor._id}</TableCell>
                <TableCell>{doctor.Ad}</TableCell>
                <TableCell>{doctor.Soyad}</TableCell>
                <TableCell>{doctor.UzmanlikAlani}</TableCell>
                <TableCell>{doctor.CalistigiHastane}</TableCell>
                <TableCell>{doctor.Telefon}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewDoctor(doctor._id)}
                  >
                    Detay
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

export default Doctors; 