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

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      const userInfo = localStorage.getItem('userInfo');
      
      if (loginStatus && userInfo) {
        setIsLoggedIn(true);
      } else {
        // Eğer userInfo yoksa veya loginStatus false ise tüm login bilgilerini temizle
        localStorage.removeItem('userInfo');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
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

  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
    if (!status) {
      // Logout durumunda tüm login bilgilerini temizle
      localStorage.removeItem('userInfo');
      localStorage.removeItem('isLoggedIn');
    }
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

  const ProtectedRoute = ({ children, allowedRoles }) => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!loginStatus || !userInfo) {
      // Login bilgileri eksikse tüm login bilgilerini temizle ve login sayfasına yönlendir
      localStorage.removeItem('userInfo');
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(userInfo?.userType)) {
      // Kullanıcı tipine göre varsayılan sayfaya yönlendir
      if (userInfo.userType === 'patient') {
        return <Navigate to="/patient/appointments" />;
      } else if (userInfo.userType === 'doctor') {
        return <Navigate to="/doctor/patients" />;
      } else {
        return <Navigate to="/" />;
      }
    }

    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar isDarkMode={isDarkMode} isLoggedIn={isLoggedIn} />
        <Routes>
          {/* Ana sayfa route'u */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* Hasta route'ları */}
          <Route path="/patient">
            <Route path="appointments" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Appointments appointments={appointments} />
              </ProtectedRoute>
            } />
            <Route path="appointments/new" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <NewAppointmentForm onSubmit={handleAddAppointment} />
              </ProtectedRoute>
            } />
            <Route path="reports" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="upload" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Upload />
              </ProtectedRoute>
            } />
          </Route>

          {/* Doktor route'ları */}
          <Route path="/doctor">
            <Route path="patients" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <Patients />
              </ProtectedRoute>
            } />
            <Route path="appointments" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <Appointments appointments={appointments} />
              </ProtectedRoute>
            } />
            <Route path="reports" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="notifications" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <Notifications />
              </ProtectedRoute>
            } />
          </Route>

          {/* Yönetici route'ları */}
          <Route path="/admin">
            <Route path="patients" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Patients />
              </ProtectedRoute>
            } />
            <Route path="doctors" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Doctors />
              </ProtectedRoute>
            } />
            <Route path="appointments" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Appointments appointments={appointments} />
              </ProtectedRoute>
            } />
            <Route path="reports" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="notifications" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Notifications />
              </ProtectedRoute>
            } />
          </Route>

          {/* Ortak route'lar */}
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
  );
}

export default App;