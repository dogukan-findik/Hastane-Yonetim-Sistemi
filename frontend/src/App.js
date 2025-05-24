import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewAppointmentForm from './components/NewAppointmentForm';
import Appointments from './pages/Appointments';
import Dashboard from './pages/Dashboard';
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
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(savedAppointments);
  }, []);

  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  const handleAddAppointment = (appointmentData) => {
    const newAppointments = [...appointments, appointmentData];
    setAppointments(newAppointments);
    localStorage.setItem('appointments', JSON.stringify(newAppointments));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: '#1a237e',
          },
          secondary: {
            main: '#40e0d0',
          },
          background: {
            default: isDarkMode ? '#121212' : '#f5f5f5',
            paper: isDarkMode ? '#1e1e1e' : '#ffffff',
          },
        },
      }),
    [isDarkMode],
  );

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
      return <div>Yükleniyor...</div>;
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/patients" element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            } />
            <Route path="/doctors" element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <Appointments appointments={appointments} />
              </ProtectedRoute>
            } />
            <Route path="/appointments/new" element={
              <ProtectedRoute>
                <NewAppointmentForm onSubmit={handleAddAppointment} />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            } />
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login updateLoginStatus={updateLoginStatus} />} />
            <Route path="/register" element={<Register updateLoginStatus={updateLoginStatus} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;