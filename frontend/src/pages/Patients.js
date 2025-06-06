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
import { Link as RouterLink, useLocation } from 'react-router-dom';

function Patients() {
  const location = useLocation();
  const [hastalar, setHastalar] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Bildirim gösterme kontrolü
    if (location.state?.showNotification) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
    
    // Hastaları yükle
    loadPatients();
  }, [location.state]);

  const loadPatients = () => {
    // Örnek hasta verileri - gerçek uygulamada API'den gelecek
    const mockPatients = [
      {
        _id: 1,
        Ad: 'Ahmet',
        Soyad: 'Yılmaz',
        DogumTarihi: '1985-03-15',
        TelefonNumarasi: '0532 123 45 67'
      },
      {
        _id: 2,
        Ad: 'Ayşe',
        Soyad: 'Demir',
        DogumTarihi: '1990-07-22',
        TelefonNumarasi: '0545 987 65 43'
      },
      {
        _id: 3,
        Ad: 'Mehmet',
        Soyad: 'Kaya',
        DogumTarihi: '1978-12-08',
        TelefonNumarasi: '0533 456 78 90'
      }
    ];
    setHastalar(mockPatients);
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
          Hasta başarıyla eklendi!
        </Alert>
      </Collapse>

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
            {hastalar.map((h) => (
              <TableRow key={h._id}>
                <TableCell>{h._id}</TableCell>
                <TableCell>{h.Ad} {h.Soyad}</TableCell>
                <TableCell>{h.DogumTarihi ? new Date(h.DogumTarihi).toLocaleDateString('tr-TR') : ''}</TableCell>
                <TableCell>{h.TelefonNumarasi}</TableCell>
                <TableCell>
                  <Button size="small" color="primary">
                    Düzenle
                  </Button>
                  <Button size="small" color="error">
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