import { Add as AddIcon } from '@mui/icons-material';
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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getHastalar } from '../services/api';
import axios from 'axios';

function Patients() {
  const [hastalar, setHastalar] = useState([]);
  const [randevular, setRandevular] = useState([]);

  useEffect(() => {
    // Kullanıcı bilgilerini localStorage'dan al
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // Eğer doktor ise, sadece kendi hastalarını çek
    if (userInfo && userInfo.role === 'doctor') {
      getHastalar(userInfo._id).then(result => {
        if (result.success) setHastalar(result.data);
      });
    } else {
      getHastalar().then(result => {
        if (result.success) setHastalar(result.data);
      });
    }

    // Randevuları çek
    axios.get(`http://localhost:5000/api/randevular/hasta/${userInfo._id}`)
      .then(response => {
        if (response.data.success) {
          setRandevular(response.data.data);
        }
      })
      .catch(error => {
        console.error('Randevular çekerken hata oluştu:', error);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Hastalar
        </Typography>
        <Button
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