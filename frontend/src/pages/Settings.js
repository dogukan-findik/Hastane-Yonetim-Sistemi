import {
    Language as LanguageIcon,
    Notifications as NotificationsIcon,
    Palette as PaletteIcon,
    Save as SaveIcon,
    Security as SecurityIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControlLabel,
    Grid,
    Snackbar,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

function Settings({ isDarkMode, toggleDarkMode }) {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        appointmentReminders: true,
        marketingEmails: false,
        darkMode: isDarkMode,
        language: 'tr',
    });

    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: '',
    });

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        const storedSettings = localStorage.getItem('userSettings');
        if (storedSettings) {
            setSettings(JSON.parse(storedSettings));
        }
    }, []);

    const handleSettingChange = (setting) => (event) => {
        const newSettings = {
            ...settings,
            [setting]: event.target.checked,
        };
        setSettings(newSettings);
        localStorage.setItem('userSettings', JSON.stringify(newSettings));

        if (setting === 'darkMode') {
            toggleDarkMode();
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordUpdate = () => {
        if (password.new !== password.confirm) {
            setAlert({
                open: true,
                message: 'Yeni şifreler eşleşmiyor!',
                severity: 'error',
            });
            return;
        }

        // Burada şifre güncelleme API'si çağrılacak
        console.log('Şifre güncellendi:', password);

        setAlert({
            open: true,
            message: 'Şifreniz başarıyla güncellendi!',
            severity: 'success',
        });

        setPassword({
            current: '',
            new: '',
            confirm: '',
        });
    };

    const handleCloseAlert = () => {
        setAlert((prev) => ({ ...prev, open: false }));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Bildirim Ayarları */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <NotificationsIcon sx={{ mr: 2, color: '#1a237e' }} />
                                <Typography variant="h6" sx={{ color: '#1a237e' }}>
                                    Bildirim Ayarları
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.emailNotifications}
                                                onChange={handleSettingChange('emailNotifications')}
                                                color="primary"
                                            />
                                        }
                                        label="E-posta Bildirimleri"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.smsNotifications}
                                                onChange={handleSettingChange('smsNotifications')}
                                                color="primary"
                                            />
                                        }
                                        label="SMS Bildirimleri"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.appointmentReminders}
                                                onChange={handleSettingChange('appointmentReminders')}
                                                color="primary"
                                            />
                                        }
                                        label="Randevu Hatırlatmaları"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.marketingEmails}
                                                onChange={handleSettingChange('marketingEmails')}
                                                color="primary"
                                            />
                                        }
                                        label="Pazarlama E-postaları"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Güvenlik Ayarları */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <SecurityIcon sx={{ mr: 2, color: '#1a237e' }} />
                                <Typography variant="h6" sx={{ color: '#1a237e' }}>
                                    Güvenlik Ayarları
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        label="Mevcut Şifre"
                                        name="current"
                                        value={password.current}
                                        onChange={handlePasswordChange}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        label="Yeni Şifre"
                                        name="new"
                                        value={password.new}
                                        onChange={handlePasswordChange}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type="password"
                                        label="Yeni Şifre (Tekrar)"
                                        name="confirm"
                                        value={password.confirm}
                                        onChange={handlePasswordChange}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        onClick={handlePasswordUpdate}
                                        sx={{
                                            bgcolor: '#1a237e',
                                            '&:hover': { bgcolor: '#000051' },
                                        }}
                                    >
                                        Şifreyi Güncelle
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Görünüm ve Dil Ayarları */}
                <Grid item xs={12}>
                    <Card elevation={3}>
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <PaletteIcon sx={{ mr: 2, color: '#1a237e' }} />
                                        <Typography variant="h6" sx={{ color: '#1a237e' }}>
                                            Görünüm Ayarları
                                        </Typography>
                                    </Box>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.darkMode}
                                                onChange={handleSettingChange('darkMode')}
                                                color="primary"
                                            />
                                        }
                                        label="Karanlık Mod"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <LanguageIcon sx={{ mr: 2, color: '#1a237e' }} />
                                        <Typography variant="h6" sx={{ color: '#1a237e' }}>
                                            Dil Ayarları
                                        </Typography>
                                    </Box>
                                    <TextField
                                        select
                                        fullWidth
                                        value={settings.language}
                                        onChange={(e) =>
                                            setSettings({ ...settings, language: e.target.value })
                                        }
                                        SelectProps={{
                                            native: true,
                                        }}
                                    >
                                        <option value="tr">Türkçe</option>
                                        <option value="en">English</option>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alert.severity}
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Settings; 