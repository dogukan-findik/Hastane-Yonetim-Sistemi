import {
    Alert,
    Box,
    Button,
    Container,
    MenuItem,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewDoctorForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Ad: '',
    Soyad: '',
    Email: '',
    Telefon: '',
    UzmanlikAlani: '',
    Deneyim: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const uzmanlikAlanlari = [
    'Kardiyoloji',
    'Nöroloji',
    'Ortopedi',
    'Pediatri',
    'Dahiliye',
    'Göz Hastalıkları',
    'Kulak Burun Boğaz',
    'Dermatoloji',
    'Psikiyatri',
    'Genel Cerrahi'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Form validasyonu
    if (!formData.Ad || !formData.Soyad || !formData.Email || !formData.UzmanlikAlani) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    try {
      // API çağrısı yapılacak
      const response = await fetch('http://localhost:5000/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          CalistigiHastane: 'Medicare Hastanesi' // Varsayılan olarak kendi hastanemiz
        })
      });

      if (!response.ok) {
        throw new Error('Doktor eklenirken bir hata oluştu');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/doctors', { state: { showNotification: true } });
      }, 2000);

    } catch (err) {
      setError(err.message || 'Bir hata oluştu');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
          Yeni Doktor Ekle
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Doktor başarıyla eklendi! Yönlendiriliyorsunuz...
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Ad"
            name="Ad"
            value={formData.Ad}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Soyad"
            name="Soyad"
            value={formData.Soyad}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-posta"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Telefon"
            name="Telefon"
            value={formData.Telefon}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Uzmanlık Alanı"
            name="UzmanlikAlani"
            value={formData.UzmanlikAlani}
            onChange={handleChange}
          >
            {uzmanlikAlanlari.map((alan) => (
              <MenuItem key={alan} value={alan}>
                {alan}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            label="Deneyim (Yıl)"
            name="Deneyim"
            type="number"
            value={formData.Deneyim}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Doktor Ekle
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default NewDoctorForm; 