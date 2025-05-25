import { Add as AddIcon } from '@mui/icons-material';


import {
  Alert,
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,


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
          {isPatient ? 'Randevularım' : 'Randevular'}
        </Typography>

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

                <TableCell>
                  <Chip
                    label={appointment.Durum}
                    color={getStatusColor(appointment.Durum)}
                    size="small"
                  />
                </TableCell>
                <TableCell>

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