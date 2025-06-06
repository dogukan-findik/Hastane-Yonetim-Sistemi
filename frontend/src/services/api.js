import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - her istekte token'ı ekle
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth Services
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Giriş yapılırken bir hata oluştu'
        };
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Kayıt olurken bir hata oluştu'
        };
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/auth/forgot-password', { email });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Şifre sıfırlama işlemi başarısız oldu'
        };
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await api.post('/auth/reset-password', { token, newPassword });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Şifre sıfırlama işlemi başarısız oldu'
        };
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/auth/me');
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Kullanıcı bilgileri alınamadı'
        };
    }
};

// Randevu Services
export const getAppointments = async (userId, role) => {
    try {
        let response;
        if (role === 'doctor') {
            response = await api.get(`/randevu/doktor/${userId}`);
        } else if (role === 'patient') {
            response = await api.get(`/randevu/hasta/${userId}`);
        } else {
            response = await api.get('/randevu');
        }
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Randevular alınamadı'
        };
    }
};

export const createAppointment = async (appointmentData) => {
    try {
        const response = await api.post('/randevu', appointmentData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Randevu oluşturulamadı'
        };
    }
};

export const updateAppointment = async (appointmentId, appointmentData) => {
    try {
        const response = await api.put(`/randevu/${appointmentId}`, appointmentData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Randevu güncellenemedi'
        };
    }
};

export const deleteAppointment = async (appointmentId) => {
    try {
        const response = await api.delete(`/randevu/${appointmentId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Randevu silinemedi'
        };
    }
};

// Doktor Services
export const getDoctors = async () => {
    try {
        const response = await api.get('/doktor');
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Doktorlar alınamadı'
        };
    }
};

export const getDoctor = async (doctorId) => {
    try {
        const response = await api.get(`/doktor/${doctorId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Doktor bilgileri alınamadı'
        };
    }
};

export const updateDoctor = async (doctorId, doctorData) => {
    try {
        const response = await api.put(`/doktor/${doctorId}`, doctorData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Doktor bilgileri güncellenemedi'
        };
    }
};

// Hasta Services
export const getPatients = async () => {
    try {
        const response = await api.get('/hasta');
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Hastalar alınamadı'
        };
    }
};

export const getPatient = async (patientId) => {
    try {
        const response = await api.get(`/hasta/${patientId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Hasta bilgileri alınamadı'
        };
    }
};

export const updatePatient = async (patientId, patientData) => {
    try {
        const response = await api.put(`/hasta/${patientId}`, patientData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Hasta bilgileri güncellenemedi'
        };
    }
};

export const deletePatient = async (patientId) => {
    try {
        const response = await api.delete(`/hasta/${patientId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Hasta silinemedi'
        };
    }
};

// Profil Services
export const getProfile = async (userId) => {
    try {
        const response = await api.get(`/profil/${userId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Profil bilgileri alınamadı'
        };
    }
};

export const updateProfile = async (userId, profileData) => {
    try {
        const response = await api.put(`/profil/${userId}`, profileData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Profil bilgileri güncellenemedi'
        };
    }
};

// Rapor Services
export const getReports = async (userId, role) => {
    try {
        let response;
        if (role === 'doctor') {
            response = await api.get(`/rapor/doktor/${userId}`);
        } else if (role === 'patient') {
            response = await api.get(`/rapor/hasta/${userId}`);
        } else {
            response = await api.get('/rapor');
        }
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Raporlar alınamadı'
        };
    }
};

export const uploadReport = async (reportData) => {
    try {
        const formData = new FormData();
        formData.append('file', reportData.file);
        formData.append('icerik', reportData.icerik);
        formData.append('ekVeri', JSON.stringify(reportData.ekVeri));

        const response = await api.post('/rapor/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Rapor yüklenirken bir hata oluştu'
        };
    }
};

// Bildirim Services
export const getNotifications = async (userId) => {
    try {
        const response = await api.get(`/bildirim/${userId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Bildirimler alınamadı'
        };
    }
};

// Ayarlar Services
export const getSettings = async (userId) => {
    try {
        const response = await api.get(`/ayarlar/${userId}`);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Ayarlar alınamadı'
        };
    }
};

export const updateSettings = async (userId, settings) => {
    try {
        const response = await api.put(`/ayarlar/${userId}`, settings);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Ayarlar güncellenemedi'
        };
    }
};

export const updatePassword = async (userId, passwordData) => {
    try {
        const response = await api.put(`/ayarlar/${userId}/password`, passwordData);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Şifre güncellenemedi'
        };
    }
};

export default api; 