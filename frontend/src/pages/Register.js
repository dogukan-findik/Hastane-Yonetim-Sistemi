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
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'patient', // Varsayılan olarak hasta
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
        userType: newUserType
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (formData.name && formData.email && formData.password) {
      // Kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userInfo', JSON.stringify({
        name: formData.name,
        email: formData.email,
        userType: formData.userType
      }));
      navigate('/');
    } else {
      setError('Lütfen tüm alanları doldurun');
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
          value={formData.userType}
          exclusive
          onChange={handleUserTypeChange}
          aria-label="user type"
          sx={{ mb: 3 }}
        >
          <ToggleButton 
            value="patient" 
            aria-label="patient"
            sx={{
              backgroundColor: '#ffebee',
              color: '#d32f2f',
              '&.Mui-selected': {
                backgroundColor: '#ef9a9a',
                color: '#b71c1c',
                '&:hover': {
                  backgroundColor: '#e57373',
                }
              },
              '&:hover': {
                backgroundColor: '#ffcdd2',
              }
            }}
          >
            <Person sx={{ mr: 1 }} /> Hasta
          </ToggleButton>
          <ToggleButton 
            value="doctor" 
            aria-label="doctor"
            sx={{
              backgroundColor: '#c8e6c9',
              color: '#1b5e20',
              '&.Mui-selected': {
                backgroundColor: '#81c784',
                color: '#1b5e20',
                '&:hover': {
                  backgroundColor: '#66bb6a',
                }
              },
              '&:hover': {
                backgroundColor: '#a5d6a7',
              }
            }}
          >
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
            id="name"
            label="Ad Soyad"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
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
            id="email"
            label="E-posta Adresi"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={formData.password}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: '#1a237e',
              '&:hover': { bgcolor: '#000051' },
            }}
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