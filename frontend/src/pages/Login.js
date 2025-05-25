import {
  AdminPanelSettings,
  LocalHospital,
  Login as LoginIcon,
  Person,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import {
  Alert,
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
import { loginUser } from "../services/api";

function Login({ updateLoginStatus }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    Email: '',
    Sifre: '',
    role: 'patient', // Varsayılan olarak hasta
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
    const result = await loginUser(formData);
    if (result.success) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('userInfo', JSON.stringify(result.data.user));
      localStorage.setItem('isLoggedIn', 'true');
      window.dispatchEvent(new Event('localStorageChange'));
      updateLoginStatus(true);
      
      // Kullanıcı tipine göre yönlendirme
      if (formData.userType === 'patient') {
        navigate('/patient/appointments');
      } else if (formData.userType === 'doctor') {
        navigate('/doctor/patients');
      } else {
        navigate('/admin/patients');
      }
    } else {
      setError(result.message || 'Giriş başarısız');
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
          Giriş Yap
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
          <ToggleButton value="admin" aria-label="admin">
            <AdminPanelSettings sx={{ mr: 1 }} /> Yönetici
          </ToggleButton>
        </ToggleButtonGroup>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Email"
            label="E-posta Adresi"
            name="Email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: '#1a237e',
              '&:hover': {
                bgcolor: '#000051',
              },
            }}
            startIcon={<LoginIcon />}
          >
            Giriş Yap
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
              sx={{ color: '#1a237e', display: 'block', mb: 1 }}
            >
              Şifremi Unuttum
            </Link>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              sx={{ color: '#1a237e' }}
            >
              Hesabınız yok mu? Kayıt olun
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login; 