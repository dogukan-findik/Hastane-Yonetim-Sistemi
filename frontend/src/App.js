import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewAppointmentForm from './components/NewAppointmentForm';
import NewDoctorForm from './components/NewDoctorForm';
import NewPatientForm from './components/NewPatientForm';
import { AuthProvider } from './context/AuthContext';
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

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      const storedUserInfo = localStorage.getItem('userInfo');
      
      if (loginStatus && storedUserInfo) {
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(storedUserInfo));
      } else {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };

    // Sayfa yüklendiğinde kontrol et
    checkLoginStatus();

    // Storage değişikliklerini dinle
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, []);

  const updateLoginStatus = (status, userData = null) => {
    setIsLoggedIn(status);
    if (status && userData) {
      setUserInfo(userData);
    } else {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('isLoggedIn');
      setUserInfo(null);
    }
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

  const handleAddAppointment = (appointmentData) => {
    const newAppointments = [...appointments, appointmentData];
    setAppointments(newAppointments);
    localStorage.setItem('appointments', JSON.stringify(newAppointments));
  };

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    // Role-based access control
    const currentPath = window.location.pathname;
    const isPatientRoute = currentPath.startsWith('/patient/');
    const isDoctorRoute = currentPath.startsWith('/doctor/');
    const isAdminRoute = currentPath.startsWith('/admin/');

    if (userInfo?.role === 'patient' && !isPatientRoute && currentPath !== '/') {
      return <Navigate to="/patient/appointments" replace />;
    }
    if (userInfo?.role === 'doctor' && !isDoctorRoute && currentPath !== '/') {
      return <Navigate to="/doctor/patients" replace />;
    }
    if (userInfo?.role === 'admin' && !isAdminRoute && currentPath !== '/') {
      return <Navigate to="/admin/patients" replace />;
    }

    return children;
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {isLoggedIn && <Navbar toggleDarkMode={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />}
          <Routes>
            <Route path="/login" element={<Login updateLoginStatus={updateLoginStatus} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Hasta Route'ları */}
            <Route path="/patient/*" element={
              <ProtectedRoute>
                <Routes>
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="doctors" element={<Doctors />} />
                  <Route path="upload" element={<Upload />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="new-appointment" element={<NewAppointmentForm onAddAppointment={handleAddAppointment} />} />
                </Routes>
              </ProtectedRoute>
            } />

            {/* Doktor Route'ları */}
            <Route path="/doctor/*" element={
              <ProtectedRoute>
                <Routes>
                  <Route path="patients" element={<Patients />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              </ProtectedRoute>
            } />

            {/* Admin Route'ları */}
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <Routes>
                  <Route path="patients" element={<Patients />} />
                  <Route path="doctors" element={<Doctors />} />
                  <Route path="appointments" element={<Appointments isAdminView={true} />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="new-patient" element={<NewPatientForm />} />
                  <Route path="new-doctor" element={<NewDoctorForm />} />
                </Routes>
              </ProtectedRoute>
            } />

            {/* Genel Route'lar */}
            <Route path="/add-patient" element={
              <ProtectedRoute>
                <NewPatientForm />
              </ProtectedRoute>
            } />

            {/* Ana sayfa yönlendirmesi */}
            <Route path="/" element={
              <ProtectedRoute>
                <Navigate to={
                  userInfo?.role === 'patient' ? '/patient/appointments' :
                  userInfo?.role === 'doctor' ? '/doctor/patients' :
                  '/admin/patients'
                } replace />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;