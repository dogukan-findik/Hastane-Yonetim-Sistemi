import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Local storage'dan token'ı kontrol et
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Token'ı decode et ve user bilgisini set et
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser(payload.user);
            } catch (error) {
                console.error('Token decode hatası:', error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token } = response.data;
            
            // Token'ı local storage'a kaydet
            localStorage.setItem('token', token);
            
            // API isteklerine token'ı ekle
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // User bilgisini set et
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser(payload.user);
            
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Giriş yapılırken bir hata oluştu'
            };
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            const { token } = response.data;
            
            // Token'ı local storage'a kaydet
            localStorage.setItem('token', token);
            
            // API isteklerine token'ı ekle
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // User bilgisini set et
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser(payload.user);
            
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Kayıt olurken bir hata oluştu'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 