import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Snackbar,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths, endOfMonth, isBefore, isWeekend } from 'date-fns';
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
    { id: 1, name: 'Dr. Ahmet Yılmaz' },
    { id: 2, name: 'Dr. Ayşe Demir' },
    { id: 3, name: 'Dr. Mehmet Kaya' },
    { id: 4, name: 'Dr. Zeynep Şahin' },
    { id: 5, name: 'Dr. Ali Öztürk' },
    { id: 6, name: 'Dr. Fatma Yıldız' },
  ],
  2: [
    { id: 7, name: 'Dr. Mustafa Demir' },
    { id: 8, name: 'Dr. Elif Kaya' },
    { id: 9, name: 'Dr. Can Yılmaz' },
    { id: 10, name: 'Dr. Seda Özkan' },
    { id: 11, name: 'Dr. Burak Şahin' },
    { id: 12, name: 'Dr. Deniz Yıldız' },
  ],
};

function getNextMonthEnd() {
  const today = new Date();
  return endOfMonth(addMonths(today, 1));
}

function generateTimeSlots(selectedHour) {
  const slots = [];
  if (selectedHour) {
    let minute = 0;
    while (minute < 60) {
      const m = minute.toString().padStart(2, '0');
      slots.push(`${selectedHour}:${m}`);
      minute += 10;
    }
  }
  return slots;
}

// Örnek dolu saatler (rastgele seçilemez)
const bookedSlots = {
  '2025-05-19': ['9:00', '9:20', '10:10', '14:30'],
  '2025-05-20': ['11:00', '12:10', '15:40'],
};

function NewAppointmentForm({ onSubmit }) {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const hours = Array.from({ length: 8 }, (_, i) => 9 + i); // 9, 10, 11, ..., 16
  const timeSlots = generateTimeSlots(selectedHour);

  const handleSubmit = () => {
    if (selectedDepartment && selectedDoctor && selectedDate && selectedTime) {
      const appointmentData = {
        department: departments.find((d) => d.id === selectedDepartment).name,
        doctor: doctors[selectedDepartment].find((d) => d.id === selectedDoctor).name,
        date: selectedDate,
        time: selectedTime,
      };
      // console.log('Submitting appointment:', appointmentData); // Hata ayıklama için
      try {
        onSubmit(appointmentData);
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
          navigate('/appointments');
        }, 2500); // 2.5 saniye sonra yönlendir
      } catch (error) {
        // console.error('Error in onSubmit:', error); // Hata ayıklama için
      }
    }
  };

  const handleCancel = () => {
    navigate('/appointments');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isSlotBooked = (slot) => {
    if (!selectedDate) return false;
    const dateStr = selectedDate.toISOString().split('T')[0];
    return bookedSlots[dateStr]?.includes(slot) || false;
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        bgcolor: '#ffffff',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        mt: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: '#1a237e',
          fontWeight: 'bold',
          mb: 3,
          fontFamily: 'Roboto, sans-serif',
          textAlign: 'center',
        }}
      >
        Randevu Planla
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#1a237e', fontFamily: 'Roboto, sans-serif' }}>
              Bölüm
            </InputLabel>
            <Select
              value={selectedDepartment}
              label="Bölüm"
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedDoctor('');
                setSelectedDate(null);
                setSelectedHour('');
                setSelectedTime('');
              }}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1a237e' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#40e0d0' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#40e0d0' },
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                fontFamily: 'Roboto, sans-serif',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {departments.map((department) => (
                <MenuItem
                  key={department.id}
                  value={department.id}
                  sx={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#1a237e', fontFamily: 'Roboto, sans-serif' }}>
              Doktor
            </InputLabel>
            <Select
              value={selectedDoctor}
              label="Doktor"
              onChange={(e) => {
                setSelectedDoctor(e.target.value);
                setSelectedDate(null);
                setSelectedHour('');
                setSelectedTime('');
              }}
              disabled={!selectedDepartment}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1a237e' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#40e0d0' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#40e0d0' },
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                fontFamily: 'Roboto, sans-serif',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {selectedDepartment &&
                doctors[selectedDepartment].map((doctor) => (
                  <MenuItem
                    key={doctor.id}
                    value={doctor.id}
                    sx={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {doctor.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
            <DatePicker
              label="Tarih"
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setSelectedHour('');
                setSelectedTime('');
              }}
              disabled={!selectedDoctor}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#1a237e' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#40e0d0' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#40e0d0' },
                    '& .MuiInputLabel-root': { color: '#1a237e' },
                    '&.Mui-focused .MuiInputLabel-root': { color: '#40e0d0' },
                    bgcolor: '#f5f5f5',
                    borderRadius: 2,
                    fontFamily: 'Roboto, sans-serif',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
                  },
                },
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      border: '1px solid #1a237e',
                    },
                    '& .MuiPickersDay-root': {
                      '&:hover': { bgcolor: '#e0f7fa' },
                      '&.Mui-selected': {
                        bgcolor: '#1a237e',
                        color: '#fff',
                        '&:hover': { bgcolor: '#40e0d0' },
                      },
                    },
                  },
                },
              }}
              minDate={new Date()}
              maxDate={getNextMonthEnd()}
              shouldDisableDate={(date) => {
                const today = new Date();
                return isBefore(date, today) || isWeekend(date);
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: '#1a237e',
              fontWeight: 'medium',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Saat
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {hours.map((hour) => (
              <Card
                key={hour}
                sx={{
                  minWidth: 80,
                  bgcolor: selectedHour === hour ? '#4caf50' : '#f5f5f5',
                  color: selectedHour === hour ? '#fff' : '#1a237e',
                  borderRadius: 3,
                  boxShadow: selectedHour === hour
                    ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                    : '0 1px 4px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    bgcolor: !selectedDate
                      ? '#f5f5f5'
                      : selectedHour === hour
                      ? '#4caf50'
                      : '#e0f7fa',
                    boxShadow: !selectedDate
                      ? '0 1px 4px rgba(0, 0, 0, 0.1)'
                      : '0 4px 12px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <CardActionArea
                  onClick={() => {
                    setSelectedHour(hour);
                    setSelectedTime('');
                  }}
                  disabled={!selectedDate}
                  sx={{ py: 1.5, textAlign: 'center' }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {hour}:00
                  </Typography>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Grid>

        {selectedHour && (
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: '#1a237e',
                fontWeight: 'medium',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              Uygun Dakikalar
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {timeSlots.map((slot) => (
                <Card
                  key={slot}
                  sx={{
                    minWidth: 80,
                    bgcolor: selectedTime === slot
                      ? '#4caf50'
                      : isSlotBooked(slot)
                      ? 'grey.200'
                      : '#f5f5f5',
                    color: selectedTime === slot ? '#fff' : isSlotBooked(slot) ? 'grey.600' : '#1a237e',
                    borderRadius: 3,
                    boxShadow: selectedTime === slot
                      ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                      : '0 1px 4px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      bgcolor: isSlotBooked(slot)
                        ? 'grey.200'
                        : selectedTime === slot
                        ? '#4caf50'
                        : '#e0f7fa',
                      boxShadow: isSlotBooked(slot)
                        ? '0 1px 4px rgba(0, 0, 0, 0.1)'
                        : '0 4px 12px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => setSelectedTime(slot)}
                    disabled={isSlotBooked(slot) || !selectedDate}
                    sx={{ py: 1.5, textAlign: 'center' }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      {slot}
                    </Typography>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Grid>
        )}

        <Grid
          size={{ xs: 12 }}
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}
        >
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              borderColor: '#1a237e',
              color: '#1a237e',
              borderRadius: 1,
              textTransform: 'none',
              fontFamily: 'Roboto, sans-serif',
              '&:hover': {
                bgcolor: '#e0f7fa',
                borderColor: '#40e0d0',
              },
            }}
          >
            İptal
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!selectedDepartment || !selectedDoctor || !selectedDate || !selectedTime}
            sx={{
              bgcolor: '#1a237e',
              borderRadius: 1,
              textTransform: 'none',
              fontFamily: 'Roboto, sans-serif',
              '&:hover': { bgcolor: '#40e0d0', color: '#1a237e' },
              '&:disabled': { bgcolor: 'grey.300', color: 'grey.600' },
            }}
          >
            Randevu Oluştur
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        TransitionComponent={Slide}
        sx={{ zIndex: 1301 }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '1.2rem',
            py: 2,
            px: 4,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Randevu alındı!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default NewAppointmentForm;