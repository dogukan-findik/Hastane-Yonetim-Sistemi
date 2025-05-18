import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
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

function generateTimeSlots() {
  const slots = [];
  let hour = 9;
  let minute = 0;
  while (hour < 17) {
    const h = hour.toString().padStart(2, '0');
    const m = minute.toString().padStart(2, '0');
    slots.push(`${h}:${m}`);
    minute += 10;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }
  return slots;
}

const timeSlots = generateTimeSlots();

function NewAppointmentForm({ open, onClose, onSubmit }) {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selectedDepartment && selectedDoctor && selectedDate && selectedTime) {
      const appointmentData = {
        department: departments.find((d) => d.id === selectedDepartment).name,
        doctor: doctors[selectedDepartment].find((d) => d.id === selectedDoctor).name,
        date: selectedDate,
        time: selectedTime,
      };
      onSubmit(appointmentData); // Üst bileşene veriyi gönder
      setSnackbarOpen(true); // "Randevu alındı" mesajını göster
      setTimeout(() => {
        onClose(); // Dialogu kapat
        navigate('/appointments'); // Appointments sayfasına dön
      }, 1500); // Mesaj göründükten 1.5 saniye sonra yönlendir
    }
  };

  const handleClose = () => {
    onClose(); // Dialogu kapat
    navigate('/appointments'); // Appointments sayfasına dön
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Yeni Randevu Oluştur</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Bölüm</InputLabel>
                <Select
                  value={selectedDepartment}
                  label="Bölüm"
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setSelectedDoctor('');
                  }}
                >
                  {departments.map((department) => (
                    <MenuItem key={department.id} value={department.id}>
                      {department.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Doktor</InputLabel>
                <Select
                  value={selectedDoctor}
                  label="Doktor"
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  disabled={!selectedDepartment}
                >
                  {selectedDepartment &&
                    doctors[selectedDepartment].map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
                <DatePicker
                  label="Tarih"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={new Date()}
                  maxDate={getNextMonthEnd()}
                  shouldDisableDate={(date) => {
                    const today = new Date();
                    return isBefore(date, today) || isWeekend(date);
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Saat</InputLabel>
                <Select
                  value={selectedTime || ''}
                  label="Saat"
                  onChange={(e) => setSelectedTime(e.target.value)}
                  disabled={!selectedDate}
                >
                  {timeSlots.map((slot) => (
                    <MenuItem key={slot} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!selectedDepartment || !selectedDoctor || !selectedDate || !selectedTime}
          >
            Randevu Oluştur
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Randevu alındı!
        </Alert>
      </Snackbar>
    </>
  );
}

export default NewAppointmentForm;