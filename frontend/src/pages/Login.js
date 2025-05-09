import {
    Login as LoginIcon,
    Visibility,
    VisibilityOff,
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
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.email && formData.password && formData.name) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userInfo', JSON.stringify({
        name: formData.name,
        email: formData.email,
        role: 'Doktor',
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
          Giriş Yap
        </Typography>

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
            id="name"
            label="Ad Soyad"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
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
            autoComplete="current-password"
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