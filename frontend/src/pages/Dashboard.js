import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    People as PeopleIcon,
    EventNote as EventNoteIcon,
    LocalHospital as LocalHospitalIcon,
    Assessment as AssessmentIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { getAppointments, getPatients, getDoctors, getReports } from '../services/api';

function Dashboard() {
    const [stats, setStats] = useState({
        appointments: 0,
        patients: 0,
        doctors: 0,
        reports: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const loadStats = useCallback(async () => {
        if (!user) return;

        try {
            const [appointmentsRes, patientsRes, doctorsRes, reportsRes] = await Promise.all([
                getAppointments(),
                getPatients(),
                getDoctors(),
                getReports()
            ]);

            setStats({
                appointments: appointmentsRes.success ? appointmentsRes.data.length : 0,
                patients: patientsRes.success ? patientsRes.data.length : 0,
                doctors: doctorsRes.success ? doctorsRes.data.length : 0,
                reports: reportsRes.success ? reportsRes.data.length : 0
            });
        } catch (error) {
            setError('İstatistikler yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadStats();
    }, [loadStats]);

    if (!user) {
        return (
            <Container>
                <Alert severity="warning">Lütfen giriş yapın</Alert>
            </Container>
        );
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%'
            }}
        >
            <Icon sx={{ fontSize: 40, color, mb: 2 }} />
            <Typography variant="h4" component="div" gutterBottom>
                {value}
            </Typography>
            <Typography variant="h6" color="text.secondary">
                {title}
            </Typography>
        </Paper>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Gösterge Paneli
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Toplam Randevu"
                        value={stats.appointments}
                        icon={EventNoteIcon}
                        color="#1976d2"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Toplam Hasta"
                        value={stats.patients}
                        icon={PeopleIcon}
                        color="#2e7d32"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Toplam Doktor"
                        value={stats.doctors}
                        icon={LocalHospitalIcon}
                        color="#ed6c02"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Toplam Rapor"
                        value={stats.reports}
                        icon={AssessmentIcon}
                        color="#9c27b0"
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Dashboard; 