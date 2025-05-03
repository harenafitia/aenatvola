import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from '../axiosConfig'; // Assurez-vous d'importer axiosInstance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Nouvelle fonction pour récupérer les informations utilisateur via /profile
    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance.get('/profile'); // Appel à GET /profile
            const data = response.data;

            // Créez un objet utilisateur simplifié
            const userInfo = {
                id: data.user_id,
                username: data.username,
                email: data.email,
                photo: data.photo,
                name: data.membre.nom_prenom_membre,
                role: data.role.role_name,
                roleDescription: data.role.role_description,
            };

            return userInfo;
        } catch (error) {
            console.error('Erreur lors de la récupération du profil utilisateur:', error);
            throw error;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const userInfo = await fetchUserProfile();
                setUser(userInfo); // Stockez les informations utilisateur dans le state
            } catch (error) {
                logout(); // Si une erreur survient, redirigez vers la page de connexion
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const logout = () => {
        Cookies.remove('sessionToken', { path: '/' });
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{
            user,
            logout,
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