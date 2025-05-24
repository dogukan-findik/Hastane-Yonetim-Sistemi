import { Add as AddIcon } from '@mui/icons-material';
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
} from '@mui/material';
import React from 'react';

function Doctors() {
  // Kullanıcı tipini localStorage'dan al
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = userInfo?.userType === 'admin';
  const isPatient = userInfo?.userType === 'patient';

  // Örnek doktor verileri
  const doctors = [
    { id: 1, name: 'Dr. Ali Öztürk', specialty: 'Kardiyoloji', status: 'Aktif', patients: 45 },
    { id: 2, name: 'Dr. Zeynep Yıldız', specialty: 'Dahiliye', status: 'Aktif', patients: 38 },
    { id: 3, name: 'Dr. Mustafa Demir', specialty: 'Ortopedi', status: 'İzinli', patients: 25 },
    { id: 4, name: 'Dr. Elif Kaya', specialty: 'Göz Hastalıkları', status: 'Aktif', patients: 42 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Doktorlar
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Yeni Doktor Ekle
          </Button>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ad Soyad</TableCell>
              <TableCell>Uzmanlık</TableCell>
              <TableCell>Durum</TableCell>
              {!isPatient && <TableCell>Hasta Sayısı</TableCell>}
              {!isPatient && <TableCell>İşlemler</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.id}</TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>
                  <Chip
                    label={doctor.status}
                    color={doctor.status === 'Aktif' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                {!isPatient && <TableCell>{doctor.patients}</TableCell>}
                {!isPatient && (
                  <TableCell>
                    <Button size="small" color="primary">
                      Düzenle
                    </Button>
                    {isAdmin && (
                      <Button size="small" color="error">
                        Sil
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Doctors; 