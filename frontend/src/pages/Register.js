import {
    PersonAdd as PersonAddIcon,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // En az 6 karakter, 1 büyük harf, 1 küçük harf ve 1 rakam
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return re.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validasyonlar
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Geçerli bir e-posta adresi girin');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Şifre en az 6 karakter uzunluğunda olmalı ve en az 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    // Başarılı kayıt
    setSuccess('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
    
    // 2 saniye sonra giriş sayfasına yönlendir
    setTimeout(() => {
      navigate('/login');
    }, 2000);
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

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                label="Ad"
                name="name"
                autoComplete="given-name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="E-posta Adresi"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
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
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            startIcon={<PersonAddIcon />}
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