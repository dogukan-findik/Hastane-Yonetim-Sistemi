import React, { useEffect, useState } from 'react';
import { Box, Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link, Alert } from '@mui/material';
import { getReports } from '../services/api';

function Reports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const result = await getReports();
      if (result.success) {
        setReports(result.data);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Raporlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
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
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Raporlarım
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          {reports.length === 0 ? (
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
                  {reports.map(report => (
                    <TableRow key={report._id}>
                      <TableCell>
                        {report.DosyaURL
                          ? <Link href={`http://localhost:5000${report.DosyaURL}`} target="_blank" rel="noopener">Görüntüle</Link>
                          : <span>Dosya yok</span>
                        }
                      </TableCell>
                      <TableCell>{report.RaporIcerigi}</TableCell>
                      <TableCell>{report.RaporTarihi && new Date(report.RaporTarihi).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <pre style={{ margin: 0, fontSize: 12 }}>{report.EkVeri ? JSON.stringify(report.EkVeri, null, 2) : '-'}</pre>
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