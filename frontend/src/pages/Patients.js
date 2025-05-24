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
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {
    if (location.state?.showNotification) {
      setShowNotification(true);
      // 5 saniye sonra bildirimi kapat
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Örnek hasta verileri
  const patients = [
    { id: 1, name: 'Ahmet Yılmaz', age: 45, phone: '555-0001', lastVisit: '2024-03-15' },
    { id: 2, name: 'Ayşe Demir', age: 32, phone: '555-0002', lastVisit: '2024-03-14' },
    { id: 3, name: 'Mehmet Kaya', age: 28, phone: '555-0003', lastVisit: '2024-03-13' },
    { id: 4, name: 'Fatma Şahin', age: 55, phone: '555-0004', lastVisit: '2024-03-12' },
  ];

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
          to="/doctor/patients/new"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Yeni Hasta Ekle
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ad Soyad</TableCell>
              <TableCell>Yaş</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell>Son Ziyaret</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
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