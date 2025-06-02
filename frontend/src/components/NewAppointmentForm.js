import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, endOfMonth, format, isBefore, isWeekend } from 'date-fns';
import trLocale from 'date-fns/locale/tr';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Örnek bölümler ve doktorlar
const departments = [
  { id: 1, name: 'Kardiyoloji' },
  { id: 2, name: 'Dahiliye' },
  { id: 3, name: 'Göz Hastalıkları' },
  { id: 4, name: 'Kulak Burun Boğaz' },
  { id: 5, name: 'Ortopedi' },
  { id: 6, name: 'Nöroloji' },
];

const doctors = {
  1: [
    { id: 1, name: 'Dr. Ahmet Yılmaz', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Dr. Ayşe Demir', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 3, name: 'Dr. Mehmet Kaya', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ],
  2: [
    { id: 4, name: 'Dr. Zeynep Şahin', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 5, name: 'Dr. Ali Öztürk', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 6, name: 'Dr. Fatma Yıldız', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  ],
};

const hours = ['09', '10', '11', '13', '14', '15', '16'];
const minutes = ['00', '10', '20', '30', '40', '50'];

// Örnek dolu randevular (gerçek uygulamada API'den gelecek)
const bookedAppointments = {
  '2024-03-20': {
    '09': ['00', '20', '40'],
    '10': ['10', '30'],
    '14': ['00', '50'],
  }
};

function getNextMonthEnd() {
  const today = new Date();
  return endOfMonth(addMonths(today, 1));
}

function NewAppointmentForm({ onSubmit }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  const steps = ['Bölüm Seçimi', 'Doktor Seçimi', 'Tarih Seçimi', 'Saat Seçimi'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDepartmentChange = (departmentId) => {
    setSelectedDepartment(departmentId);
    setSelectedDoctor('');
    setSelectedDate(null);
    setSelectedHour('');
    setSelectedMinute('');
    handleNext();
  };

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctor(doctorId);
    handleNext();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedHour('');
    setSelectedMinute('');
    handleNext();
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
    setSelectedMinute('');
  };

  const handleMinuteSelect = (minute) => {
    setSelectedMinute(minute);
  };

  const isTimeSlotBooked = (hour, minute) => {
    if (!selectedDate) return false;
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return bookedAppointments[dateStr]?.[hour]?.includes(minute) || false;
  };

  const handleSubmit = () => {
    const appointmentData = {
      department: departments.find(d => d.id === selectedDepartment)?.name,
      doctor: doctors[selectedDepartment]?.find(d => d.id === selectedDoctor)?.name,
      date: selectedDate,
      time: `${selectedHour}:${selectedMinute}`,
      id: Date.now(), // Temporary ID
    };

    if (onSubmit) {
      onSubmit(appointmentData);
    }
    navigate('/appointments', { state: { showNotification: true } });
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return selectedDepartment !== '';
      case 1:
        return selectedDoctor !== '';
      case 2:
        return selectedDate !== null;
      case 3:
        return selectedHour !== '' && selectedMinute !== '';
      default:
        return false;
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3} justifyContent="center">
            {departments.map((department) => (
              <Grid item xs={12} sm={6} md={4} key={department.id}>
                <Card
                  onClick={() => handleDepartmentChange(department.id)}
                  sx={{
                    p: 3,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    bgcolor: selectedDepartment === department.id ? 'primary.light' : 'background.paper',
                    color: selectedDepartment === department.id ? 'white' : 'text.primary',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                      bgcolor: 'primary.light',
                      color: 'white',
                    },
                  }}
                >
                  <Typography variant="h6">{department.name}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3} justifyContent="center">
            {doctors[selectedDepartment]?.map((doctor) => (
              <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                <Card
                  onClick={() => handleDoctorSelect(doctor.id)}
                  sx={{
                    p: 3,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    bgcolor: selectedDoctor === doctor.id ? 'primary.light' : 'background.paper',
                    color: selectedDoctor === doctor.id ? 'white' : 'text.primary',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={doctor.image}
                    alt={doctor.name}
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6">{doctor.name}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        );

      case 2:
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
              <DatePicker
                label="Randevu Tarihi"
                value={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                maxDate={getNextMonthEnd()}
                shouldDisableDate={(date) =>
                  isWeekend(date) || isBefore(date, new Date())
                }
                sx={{ width: 300 }}
              />
            </LocalizationProvider>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
              Saat Seçimi
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
                Saat dilimi seçiniz
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {hours.map((hour) => (
                  <Grid item key={hour}>
                    <Button
                      variant={selectedHour === hour ? "contained" : "outlined"}
                      onClick={() => handleHourSelect(hour)}
                      sx={{
                        minWidth: 100,
                        bgcolor: selectedHour === hour ? 'primary.main' : 'transparent',
                        '&:hover': {
                          bgcolor: selectedHour === hour ? 'primary.dark' : 'primary.light',
                        },
                      }}
                    >
                      {hour}:00
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {selectedHour && (
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
                  Dakika seçiniz
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {minutes.map((minute) => {
                    const isBooked = isTimeSlotBooked(selectedHour, minute);
                    return (
                      <Grid item key={minute}>
                        <Button
                          variant={selectedMinute === minute ? "contained" : "outlined"}
                          onClick={() => handleMinuteSelect(minute)}
                          disabled={isBooked}
                          sx={{
                            minWidth: 100,
                            bgcolor: isBooked 
                              ? 'error.light'
                              : selectedMinute === minute 
                              ? 'primary.main' 
                              : 'transparent',
                            color: isBooked 
                              ? 'error.contrastText'
                              : selectedMinute === minute 
                              ? 'primary.contrastText' 
                              : 'primary.main',
                            '&:hover': {
                              bgcolor: isBooked 
                                ? 'error.light'
                                : selectedMinute === minute 
                                ? 'primary.dark' 
                                : 'primary.light',
                            },
                            '&.Mui-disabled': {
                              bgcolor: 'error.light',
                              color: 'error.contrastText',
                            },
                          }}
                        >
                          {selectedHour}:{minute}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center', color: 'primary.main' }}>
          Yeni Randevu
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={() => navigate('/appointments')}
            variant="outlined"
            color="primary"
          >
            İptal
          </Button>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Geri
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={!canProceed()}
              >
                Randevu Oluştur
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="contained"
                disabled={!canProceed()}
              >
                İleri
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default NewAppointmentForm;