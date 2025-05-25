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