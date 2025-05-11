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

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Şifre sıfırlama işlemleri burada yapılacak
    console.log('Şifre sıfırlama e-postası gönderiliyor:', email);
    setIsSubmitted(true);
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