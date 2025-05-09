import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useMemo, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Appointments from './pages/Appointments';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Patients from './pages/Patients';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Settings from './pages/Settings';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 