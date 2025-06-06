import { Send as SendIcon } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { forgotPassword } from '../services/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.message || 'Şifre sıfırlama işlemi başarısız oldu');
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
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
          Şifremi Unuttum
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        {isSubmitted ? (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Alert severity="success" sx={{ mb: 2 }}>
              Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.
            </Alert>
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              sx={{ color: '#1a237e' }}
            >
              Giriş sayfasına dön
            </Link>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
              E-posta adresinizi girin. Size şifre sıfırlama bağlantısı göndereceğiz.
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-posta Adresi"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              startIcon={<SendIcon />}
            >
              Şifre Sıfırlama Bağlantısı Gönder
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                sx={{ color: '#1a237e' }}
              >
                Giriş sayfasına dön
              </Link>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default ForgotPassword; 