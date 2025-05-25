import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
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

// Login işlemi
export const loginUser = async (userData) => {
    try {
        const response = await api.post('/auth/login', {
            Email: userData.Email,
            Sifre: userData.Sifre,
            role: userData.role
        });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Giriş yapılırken bir hata oluştu'
        };
    }
};

// Register işlemi
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

export const getProfile = async () => {
    try {
        const response = await api.get('/auth/me');
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Profil bilgisi alınamadı'
        };
    }
};

export const getHastalar = async (doktorID) => {
    try {
        let url = '/hastalar/listele';
        if (doktorID) {
            url = `/hastalar/doktor/${doktorID}`;
        }
        const response = await api.get(url);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Hastalar alınamadı' };
    }
};

// Dosya yükleme işlemi
export const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${API_URL}/upload/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return { 
            success: true, 
            data: response.data,
            message: 'Dosya başarıyla yüklendi'
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Dosya yüklenirken bir hata oluştu'
        };
    }
};

export default api; 