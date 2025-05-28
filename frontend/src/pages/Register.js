import {
  AccountCircle,
  LocalHospital,
  Person,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    role: 'patient',
    Ad: '',
    Soyad: '',
    Email: '',
    Sifre: '',
    confirmPassword: '',
    // Hasta
    DogumTarihi: '',
    Cinsiyet: '',
    TelefonNumarasi: '',
    Adres: '',
    // Doktor
    UzmanlikAlani: '',
    CalistigiHastane: '',
    Telefon: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (event, newUserType) => {
    if (newUserType !== null) {
      setFormData(prev => ({
        ...prev,
        role: newUserType
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.Sifre !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    // Gerekli alanlar kontrolü
    if (formData.role === 'patient') {
      if (!formData.Ad || !formData.Soyad || !formData.Email || !formData.Sifre || !formData.DogumTarihi || !formData.Cinsiyet || !formData.TelefonNumarasi || !formData.Adres) {
        setError('Lütfen tüm alanları doldurun');
        return;
      }
    } else {
      if (!formData.Ad || !formData.Soyad || !formData.Email || !formData.Sifre || !formData.UzmanlikAlani || !formData.CalistigiHastane || !formData.Telefon) {
        setError('Lütfen tüm alanları doldurun');
        return;
      }
    }

    const result = await registerUser(formData);
    if (result.success) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('userInfo', JSON.stringify(result.data.user));
      localStorage.setItem('isLoggedIn', 'true');

    } else {
      setError(result.message || 'Kayıt işlemi başarısız');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 3, color: '#1a237e', fontWeight: 'bold' }}
        >
          Kayıt Ol
        </Typography>

        <ToggleButtonGroup
          value={formData.role}
          exclusive
          onChange={handleUserTypeChange}
          aria-label="user type"
          sx={{ mb: 3 }}
        >
          <ToggleButton value="patient" aria-label="patient">
            <Person sx={{ mr: 1 }} /> Hasta
          </ToggleButton>
          <ToggleButton value="doctor" aria-label="doctor">
            <LocalHospital sx={{ mr: 1 }} /> Doktor
          </ToggleButton>
        </ToggleButtonGroup>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Ad"
            label="Ad"
            name="Ad"
            autoComplete="given-name"
            autoFocus
            value={formData.Ad}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="Soyad"
            label="Soyad"
            name="Soyad"
            autoComplete="family-name"
            value={formData.Soyad}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="Email"
            label="E-posta Adresi"
            name="Email"
            autoComplete="email"
            value={formData.Email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Sifre"
            label="Şifre"
            type={showPassword ? 'text' : 'password'}
            id="Sifre"
            autoComplete="new-password"
            value={formData.Sifre}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Şifre Tekrar"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {formData.role === 'patient' && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                name="DogumTarihi"
                label="Doğum Tarihi"
                type="date"
                id="DogumTarihi"
                InputLabelProps={{ shrink: true }}
                value={formData.DogumTarihi}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                select
                name="Cinsiyet"
                label="Cinsiyet"
                id="Cinsiyet"
                value={formData.Cinsiyet}
                onChange={handleChange}
              >
                <MenuItem value="Erkek">Erkek</MenuItem>
                <MenuItem value="Kadın">Kadın</MenuItem>
              </TextField>
              <TextField
                margin="normal"
                required
                fullWidth
                name="TelefonNumarasi"
                label="Telefon Numarası"
                id="TelefonNumarasi"
                value={formData.TelefonNumarasi}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Adres"
                label="Adres"
                id="Adres"
                value={formData.Adres}
                onChange={handleChange}
              />
            </>
          )}

          {formData.role === 'doctor' && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                name="UzmanlikAlani"
                label="Uzmanlık Alanı"
                id="UzmanlikAlani"
                value={formData.UzmanlikAlani}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="CalistigiHastane"
                label="Çalıştığı Hastane"
                id="CalistigiHastane"
                value={formData.CalistigiHastane}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Telefon"
                label="Telefon"
                id="Telefon"
                value={formData.Telefon}
                onChange={handleChange}
              />
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#1a237e', '&:hover': { bgcolor: '#000051' } }}
          >
            Kayıt Ol
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              sx={{ color: '#1a237e' }}
            >
              Zaten hesabınız var mı? Giriş yapın
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register; 