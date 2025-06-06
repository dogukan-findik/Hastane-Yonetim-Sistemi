import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios instance oluşturma
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - her istekte token ekleme
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

// Auth API
export const authAPI = {
    // Kayıt olma
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    // Giriş yapma
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    // Kullanıcı bilgilerini getirme
    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};

// Randevu API
export const randevuAPI = {
    // Randevu oluşturma
    createRandevu: async (randevuData) => {
        const response = await api.post('/randevu', randevuData);
        return response.data;
    },

    // Tüm randevuları getirme
    getAllRandevular: async () => {
        const response = await api.get('/randevu');
        return response.data;
    },

    // Randevu güncelleme
    updateRandevu: async (randevuId, randevuData) => {
        const response = await api.put(`/randevu/${randevuId}`, randevuData);
        return response.data;
    },

    // Randevu silme
    deleteRandevu: async (randevuId) => {
        const response = await api.delete(`/randevu/${randevuId}`);
        return response.data;
    },

    // Doktorun randevularını getirme
    getDoktorRandevulari: async (doktorId) => {
        const response = await api.get(`/randevu/doktor/${doktorId}`);
        return response.data;
    },

    // Hastanın randevularını getirme
    getHastaRandevulari: async (hastaId) => {
        const response = await api.get(`/randevu/hasta/${hastaId}`);
        return response.data;
    }
};

// Doktor API
export const doktorAPI = {
    // Doktor ekleme
    createDoktor: async (doktorData) => {
        const response = await api.post('/doktor', doktorData);
        return response.data;
    },

    // Tüm doktorları getirme
    getAllDoktorlar: async () => {
        const response = await api.get('/doktor');
        return response.data;
    },

    // Doktor güncelleme
    updateDoktor: async (doktorId, doktorData) => {
        const response = await api.put(`/doktor/${doktorId}`, doktorData);
        return response.data;
    },

    // Doktor silme
    deleteDoktor: async (doktorId) => {
        const response = await api.delete(`/doktor/${doktorId}`);
        return response.data;
    }
};

// Hasta API
export const hastaAPI = {
    // Hasta ekleme
    createHasta: async (hastaData) => {
        const response = await api.post('/hasta', hastaData);
        return response.data;
    },

    // Tüm hastaları getirme
    getAllHastalar: async () => {
        const response = await api.get('/hasta');
        return response.data;
    },

    // Tek hasta getirme
    getHasta: async (hastaId) => {
        const response = await api.get(`/hasta/${hastaId}`);
        return response.data;
    },

    // Hasta güncelleme
    updateHasta: async (hastaId, hastaData) => {
        const response = await api.put(`/hasta/guncelle/${hastaId}`, hastaData);
        return response.data;
    },

    // Hasta silme
    deleteHasta: async (hastaId) => {
        const response = await api.delete(`/hasta/sil/${hastaId}`);
        return response.data;
    },

    // Doktorun hastalarını getirme
    getDoktorHastalari: async (doktorId) => {
        const response = await api.get(`/hasta/doktor/${doktorId}`);
        return response.data;
    }
};

export default api; 