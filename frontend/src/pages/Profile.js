import {
    AccountCircle,
    Cancel as CancelIcon,
    Edit as EditIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Save as SaveIcon,
    Work as WorkIcon,
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

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    address: '',
    department: '',
    specialization: '',
  });

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setUserInfo({
        ...parsedInfo,
        phone: parsedInfo.phone || '',
        address: parsedInfo.address || '',
        department: parsedInfo.department || '',
        specialization: parsedInfo.specialization || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(storedUserInfo);
    setIsEditing(false);
  };

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
                {userInfo.name?.charAt(0)}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {userInfo.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {userInfo.role}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
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
                    onClick={handleCancel}
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
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    disabled={!isEditing}
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
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    disabled={!isEditing}
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
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
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
                    name="address"
                    value={userInfo.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                Profesyonel Bilgiler
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Departman"
                    name="department"
                    value={userInfo.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Uzmanlık Alanı"
                    name="specialization"
                    value={userInfo.specialization}
                    onChange={handleChange}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: (
                        <WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile; 