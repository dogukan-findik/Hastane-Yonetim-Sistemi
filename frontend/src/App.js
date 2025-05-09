import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
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

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  // Login durumunu güncellemek için fonksiyon
  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
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

  // Korumalı route bileşeni
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (allowedRoles && !allowedRoles.includes(userInfo?.userType)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
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
            <ProtectedRoute allowedRoles={['doctor', 'admin']}>
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
              <Appointments />
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Upload />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute allowedRoles={['doctor', 'admin']}>
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
  );
}

export default App; 