import {
    AccountCircle,
    Cancel as CancelIcon,
    Edit as EditIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Save as SaveIcon,
    Work as WorkIcon
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();
      if (result.success) setUser(result.data);
      else setError(result.message);
    };
    fetchProfile();
  }, []);

  if (error) return <div>Hata: {error}</div>;
  if (!user) return <div>Yükleniyor...</div>;

  // Ortak alanlar
  const adSoyad = user.Ad ? `${user.Ad} ${user.Soyad}` : '';
  const email = user.Email || '';
  const telefon = user.TelefonNumarasi || user.Telefon || '';
  const adres = user.Adres || '';
  const uzmanlik = user.UzmanlikAlani || '';
  const calistigiHastane = user.CalistigiHastane || '';
  const dogumTarihi = user.DogumTarihi ? new Date(user.DogumTarihi).toLocaleDateString() : '';
  const cinsiyet = user.Cinsiyet || '';
  const rol = user.role || user.Rol || '';

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profil Kartı */}
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: '#40e0d0',
                  fontSize: '3rem',
                }}
              >
                {user.Ad?.charAt(0) || user.AdSoyad?.charAt(0) || 'K'}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {adSoyad}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {email}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {rol && rol.charAt(0).toUpperCase() + rol.slice(1)}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                  onClick={() => setIsEditing(!isEditing)}
                  sx={{
                    bgcolor: '#1a237e',
                    '&:hover': { bgcolor: '#000051' },
                  }}
                >
                  {isEditing ? 'Kaydet' : 'Düzenle'}
                </Button>
                {isEditing && (
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => setIsEditing(false)}
                    sx={{ ml: 1 }}
                  >
                    İptal
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Detay Kartı */}
        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                Kişisel Bilgiler
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ad Soyad"
                    value={adSoyad}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <AccountCircle sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="E-posta"
                    value={email}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    value={telefon}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Adres"
                    value={adres}
                    disabled
                    InputProps={{
                      startAdornment: (
                        <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                    }}
                  />
                </Grid>
                {dogumTarihi && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Doğum Tarihi"
                      value={dogumTarihi}
                      disabled
                    />
                  </Grid>
                )}
                {cinsiyet && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Cinsiyet"
                      value={cinsiyet}
                      disabled
                    />
                  </Grid>
                )}
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                Profesyonel Bilgiler
              </Typography>
              <Grid container spacing={3}>
                {uzmanlik && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Uzmanlık Alanı"
                      value={uzmanlik}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        ),
                      }}
                    />
                  </Grid>
                )}
                {calistigiHastane && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Çalıştığı Hastane"
                      value={calistigiHastane}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        ),
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile; 