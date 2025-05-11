import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import trLocale from 'date-fns/locale/tr';
import React, { useState } from 'react';

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
  // Diğer bölümler için benzer şekilde doktorlar eklenebilir
};

function NewAppointmentForm({ open, onClose, onSubmit }) {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleSubmit = () => {
    if (selectedDepartment && selectedDoctor && selectedDate && selectedTime) {
      onSubmit({
        department: departments.find(d => d.id === selectedDepartment).name,
        doctor: doctors[selectedDepartment].find(d => d.id === selectedDoctor).name,
        date: selectedDate,
        time: selectedTime,
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Randevu Oluştur</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
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

          <Grid item xs={12}>
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

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
              <DatePicker
                label="Tarih"
                value={selectedDate}
                onChange={setSelectedDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
                minDate={new Date()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
              <TimePicker
                label="Saat"
                value={selectedTime}
                onChange={setSelectedTime}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!selectedDepartment || !selectedDoctor || !selectedDate || !selectedTime}
        >
          Randevu Oluştur
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewAppointmentForm; 