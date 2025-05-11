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

function Appointments() {
  // Örnek randevu verileri
  const appointments = [
    {
      id: 1,
      patientName: 'Ahmet Yılmaz',
      doctorName: 'Dr. Ali Öztürk',
      date: '2024-03-20',
      time: '10:00',
      status: 'Onaylandı',
    },
    {
      id: 2,
      patientName: 'Ayşe Demir',
      doctorName: 'Dr. Zeynep Yıldız',
      date: '2024-03-20',
      time: '11:30',
      status: 'Beklemede',
    },
    {
      id: 3,
      patientName: 'Mehmet Kaya',
      doctorName: 'Dr. Mustafa Demir',
      date: '2024-03-20',
      time: '14:00',
      status: 'İptal Edildi',
    },
    {
      id: 4,
      patientName: 'Fatma Şahin',
      doctorName: 'Dr. Elif Kaya',
      date: '2024-03-20',
      time: '15:30',
      status: 'Onaylandı',
    },
  ];

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
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Yeni Randevu
        </Button>
      </Box>
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
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.id}</TableCell>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button size="small" color="primary">
                    Düzenle
                  </Button>
                  <Button size="small" color="error">
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