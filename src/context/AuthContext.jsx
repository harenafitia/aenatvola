import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from '../axiosConfig'; // Assurez-vous d'importer axiosInstance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const cookieOptions = {
        expires: 7,
        secure: import.meta.env.VITE_SECURE_COOKIES === 'true',
        sameSite: 'Lax',
        path: '/'
    };

    // Nouvelle fonction pour vérifier le token et obtenir les informations utilisateur
    const verifyTokenAndGetUserInfo = async (token) => {
        try {
            const response = await axiosInstance.post('/auth/verify-token', { token });
            const { decoded } = response.data;

            // Créer un objet utilisateur avec les informations décodées
            const userInfo = {
                name: decoded.username,
                role: decoded.role.role_name,
                roleDescription: decoded.role.role_description,
                userId: decoded.sub,
                token: token // Garder le token dans l'objet utilisateur
            };

            return userInfo;
        } catch (error) {
            console.error('Erreur lors de la vérification du token:', error);
            throw error;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const sessionToken = Cookies.get('sessionToken');

            if (sessionToken) {
                try {
                    const userInfo = await verifyTokenAndGetUserInfo(sessionToken);
                    setUser(userInfo);
                    Cookies.set('user', JSON.stringify(userInfo), cookieOptions);
                } catch (error) {
                    console.error('Erreur d\'authentification:', error);
                    logout();
                }
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (userData) => {
        try {
            // Vérifier le token immédiatement après la connexion
            const userInfo = await verifyTokenAndGetUserInfo(userData.token);

            // Sauvegarder les données complètes dans les cookies
            Cookies.set('user', JSON.stringify(userInfo), cookieOptions);
            Cookies.set('sessionToken', userData.token, cookieOptions);

            setUser(userInfo);
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            throw error;
        }
    };

    const logout = () => {
        Cookies.remove('user', { path: '/' });
        Cookies.remove('sessionToken', { path: '/' });
        setUser(null);
        navigate('/login');
    };

    // Fonction pour vérifier si la session est valide
    const checkSession = async () => {
        const sessionToken = Cookies.get('sessionToken');
        if (!sessionToken) return false;

        try {
            await verifyTokenAndGetUserInfo(sessionToken);
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            checkSession,
            isLoading
        }}>
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