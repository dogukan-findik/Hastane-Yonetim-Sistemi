import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert
} from '@mui/material';
import { resetPassword } from '../services/api';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // URL'den token'ı al
    const token = new URLSearchParams(location.search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor');
            return;
        }

        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır');
            return;
        }

        try {
            const response = await resetPassword(token, password);
            if (response.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(response.message || 'Şifre sıfırlama işlemi başarısız oldu');
            }
        } catch (error) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    if (!token) {
        return (
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Alert severity="error">Geçersiz veya eksik token</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Şifre Sıfırlama
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Şifreniz başarıyla sıfırlandı. Giriş sayfasına yönlendiriliyorsunuz...
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Yeni Şifre"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Şifre Tekrar"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        margin="normal"
                        required
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 3 }}
                        disabled={success}
                    >
                        Şifreyi Sıfırla
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default ResetPassword; 