import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import NewAppointmentForm from './components/NewAppointmentForm';
import NewDoctorForm from './components/NewDoctorForm';
import NewPatientForm from './components/NewPatientForm';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Notifications from './pages/Notifications';
import Patients from './pages/Patients';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

function AppContent() {
  const { user, loading } = useAuth();
  const [darkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
        },
      }),
    [darkMode]
  );

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/" />} />
          <Route path="/reset-password" element={!user ? <ResetPassword /> : <Navigate to="/" />} />

          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/appointments" element={user ? <Appointments /> : <Navigate to="/login" />} />
          <Route path="/doctors" element={user ? <Doctors /> : <Navigate to="/login" />} />
          <Route path="/patients" element={user ? <Patients /> : <Navigate to="/login" />} />
          <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/notifications" element={user ? <Notifications /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/upload" element={user ? <Upload /> : <Navigate to="/login" />} />

          <Route path="/new-appointment" element={user ? <NewAppointmentForm /> : <Navigate to="/login" />} />
          <Route path="/new-doctor" element={user ? <NewDoctorForm /> : <Navigate to="/login" />} />
          <Route path="/new-patient" element={user ? <NewPatientForm /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;