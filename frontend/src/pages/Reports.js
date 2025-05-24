import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material';

function Reports() {
  const [raporlar, setRaporlar] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (userInfo.role === 'patient') {
      axios.get(`http://localhost:5000/api/raporlar/hasta/${userInfo._id}`).then(res => setRaporlar(res.data));
    } else if (userInfo.role === 'doctor') {
      axios.get('http://localhost:5000/api/raporlar/listele').then(res => setRaporlar(res.data));
    }
  }, [userInfo]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Raporlarım
        </Typography>
        <Box sx={{ mt: 3 }}>
          {raporlar.length === 0 ? (
            <Typography>Hiç rapor bulunamadı.</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Dosya</TableCell>
                    <TableCell>Rapor İçeriği</TableCell>
                    <TableCell>Tarih</TableCell>
                    <TableCell>Ek Veri</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {raporlar.map(r => (
                    <TableRow key={r.RaporID}>
                      <TableCell>
                        {r.DosyaURL
                          ? <Link href={`http://localhost:5000${r.DosyaURL}`} target="_blank" rel="noopener">Görüntüle</Link>
                          : <span>Dosya yok</span>
                        }
                      </TableCell>
                      <TableCell>{r.RaporIcerigi}</TableCell>
                      <TableCell>{r.RaporTarihi && new Date(r.RaporTarihi).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <pre style={{ margin: 0, fontSize: 12 }}>{r.EkVeri ? JSON.stringify(r.EkVeri, null, 2) : '-'}</pre>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Reports; 