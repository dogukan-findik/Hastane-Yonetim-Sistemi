import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const steps = ['Kişisel Bilgiler', 'Sağlık Bilgileri', 'Detaylı Bilgiler'];

const formStyles = {
  backgroundColor: 'background.paper',
  '& .MuiInputBase-root': {
    height: '56px'
  },
  '& .MuiInputBase-inputMultiline': {
    height: 'auto'
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'primary.main',
    },
  }
};

function NewPatientForm({ onSubmit }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    bloodType: '',
    address: '',
    allergies: '',
    chronicDiseases: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep === steps.length - 1) {
      onSubmit(formData);
      navigate('/doctor/patients', { state: { showNotification: true } });
    } else {
      handleNext();
    }
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return formData.name.trim() !== '' && 
               formData.email.trim() !== '' && 
               formData.phone.trim() !== '';
      case 1:
        return formData.birthDate.trim() !== '' && 
               formData.gender.trim() !== '' && 
               formData.bloodType.trim() !== '';
      case 2:
        return true; // Son adımda tüm alanlar opsiyonel
      default:
        return false;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
              Hastanın kişisel bilgilerini giriniz
            </Typography>
            <Grid container spacing={3} maxWidth="800px">
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Ad Soyad"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={formData.name.trim() === ''}
                  helperText={formData.name.trim() === '' ? 'Ad Soyad zorunludur' : ''}
                  sx={formStyles}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="E-posta"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={formData.email.trim() === ''}
                  helperText={formData.email.trim() === '' ? 'E-posta zorunludur' : ''}
                  sx={formStyles}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  fullWidth
                  label="Telefon"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={formData.phone.trim() === ''}
                  helperText={formData.phone.trim() === '' ? 'Telefon zorunludur' : ''}
                  sx={formStyles}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
              Hastanın sağlık bilgilerini giriniz
            </Typography>
            <Grid container spacing={3} maxWidth="800px">
              <Grid item xs={12} md={3.5}>
                <TextField
                  required
                  fullWidth
                  label="Doğum Tarihi"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  error={formData.birthDate.trim() === ''}
                  helperText={formData.birthDate.trim() === '' ? 'Doğum tarihi zorunludur' : ''}
                  inputProps={{
                    placeholder: 'GG.AA.YYYY'
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    ...formStyles,
                    minWidth: '160px',
                    '& .MuiInputBase-root': {
                      height: '56px'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3.5}>
                <FormControl 
                  fullWidth 
                  required 
                  error={formData.gender.trim() === ''}
                  sx={{
                    ...formStyles,
                    minWidth: '160px',
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center',
                      minWidth: '160px'
                    },
                    '& .MuiOutlinedInput-root': {
                      width: '100%'
                    }
                  }}
                >
                  <InputLabel error={formData.gender.trim() === ''}>Cinsiyet</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    label="Cinsiyet"
                    displayEmpty
                    MenuProps={{
                      PaperProps: {
                        sx: { minWidth: '160px' }
                      }
                    }}
                  >
                    <MenuItem value="male">Erkek</MenuItem>
                    <MenuItem value="female">Kadın</MenuItem>
                    <MenuItem value="other">Diğer</MenuItem>
                  </Select>
                  {formData.gender.trim() === '' && (
                    <FormHelperText error>Cinsiyet seçimi zorunludur</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3.5}>
                <FormControl 
                  fullWidth 
                  required
                  error={formData.bloodType.trim() === ''}
                  sx={{
                    ...formStyles,
                    minWidth: '160px',
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center',
                      minWidth: '160px'
                    },
                    '& .MuiOutlinedInput-root': {
                      width: '100%'
                    }
                  }}
                >
                  <InputLabel error={formData.bloodType.trim() === ''}>Kan Grubu</InputLabel>
                  <Select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    label="Kan Grubu"
                    displayEmpty
                    MenuProps={{
                      PaperProps: {
                        sx: { minWidth: '160px' }
                      }
                    }}
                  >
                    <MenuItem value="A+">A Rh+</MenuItem>
                    <MenuItem value="A-">A Rh-</MenuItem>
                    <MenuItem value="B+">B Rh+</MenuItem>
                    <MenuItem value="B-">B Rh-</MenuItem>
                    <MenuItem value="AB+">AB Rh+</MenuItem>
                    <MenuItem value="AB-">AB Rh-</MenuItem>
                    <MenuItem value="0+">0 Rh+</MenuItem>
                    <MenuItem value="0-">0 Rh-</MenuItem>
                  </Select>
                  {formData.bloodType.trim() === '' && (
                    <FormHelperText error>Kan grubu seçimi zorunludur</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
              Hastanın detaylı bilgilerini giriniz
            </Typography>
            <Grid container spacing={3} maxWidth="800px">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Adres"
                  name="address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  sx={{
                    backgroundColor: 'background.paper',
                    '& .MuiInputBase-root': {
                      height: 'auto'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Alerjiler"
                  name="allergies"
                  multiline
                  rows={3}
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Varsa alerjilerini yazınız"
                  sx={{
                    backgroundColor: 'background.paper',
                    '& .MuiInputBase-root': {
                      height: 'auto'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Kronik Hastalıklar"
                  name="chronicDiseases"
                  multiline
                  rows={3}
                  value={formData.chronicDiseases}
                  onChange={handleChange}
                  placeholder="Varsa kronik hastalıklarını yazınız"
                  sx={{
                    backgroundColor: 'background.paper',
                    '& .MuiInputBase-root': {
                      height: 'auto'
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return 'Bilinmeyen Adım';
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        pt: 4,
        pb: 4,
        backgroundColor: '#f5f5f5'
      }}
    >
      <Container maxWidth="md">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            backgroundColor: 'white',
            borderRadius: 2
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              mb: 4, 
              textAlign: 'center', 
              color: 'primary.main',
              fontWeight: 'medium'
            }}
          >
            Yeni Hasta Ekle
          </Typography>

          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 5,
              '& .MuiStepLabel-root .Mui-completed': {
                color: 'success.main'
              },
              '& .MuiStepLabel-root .Mui-active': {
                color: 'primary.main'
              }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box component="form" onSubmit={handleSubmit}>
            {getStepContent(activeStep)}

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mt: 5,
              pt: 3,
              borderTop: 1,
              borderColor: 'grey.200'
            }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={activeStep === 0 ? () => navigate('/doctor/patients') : handleBack}
                sx={{ px: 4, py: 1.5 }}
              >
                {activeStep === 0 ? 'İptal' : 'Geri'}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isStepValid()}
                sx={{ px: 4, py: 1.5 }}
              >
                {activeStep === steps.length - 1 ? 'Hasta Ekle' : 'İleri'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default NewPatientForm; 