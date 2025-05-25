import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewAppointmentForm from './components/NewAppointmentForm';
import AddPatient from './pages/AddPatient';
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


    }

    return children;
  };

  return (

  );
}

export default App;