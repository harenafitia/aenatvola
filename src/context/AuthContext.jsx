import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; //import fonction Coockies

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Configuration des cookies
    const cookieOptions = {
        expires: 7, // Expire après 7 jours
        secure: import.meta.env.VITE_SECURE_COOKIES === 'true',
        sameSite: 'Lax',
        path: '/'
    };

    useEffect(() => {
        // Vérifier si l'utilisateur est déjà connecté au chargement
        const storedUser = Cookies.get('user');
        const sessionToken = Cookies.get('sessionToken');

        if (storedUser && sessionToken) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
            } catch (error) {
                console.error('Erreur lors de la lecture des données utilisateur:', error);
                logout();
            }
        }
        setIsLoading(false); // Indique que le chargement est terminé
    }, []);

    const login = (userData) => {
        // Enregistrer les données dans les cookies
        Cookies.set('user', JSON.stringify(userData), cookieOptions);
        Cookies.set('sessionToken', userData.token, cookieOptions);

        setUser(userData);
    };

    const logout = () => {
        // Supprimer les cookies
        Cookies.remove('user', { path: '/' });
        Cookies.remove('sessionToken', { path: '/' });

        setUser(null);
        navigate('/login');
    };

    // Fonction pour vérifier si la session est valide
    const checkSession = () => {
        const sessionToken = Cookies.get('sessionToken');
        const userData = Cookies.get('user');
        return !!(sessionToken && userData && isTokenValid(sessionToken));
    };


    // Fonction pour rafraîchir la session
    const refreshSession = () => {
        const userData = Cookies.get('user');
        if (userData && checkSession()) {
            // Renouveler le token de session
            const newSessionToken = generateSessionToken();

            // Réinitialiser les cookies avec de nouvelles dates d'expiration
            Cookies.set('user', userData, cookieOptions);
            Cookies.set('sessionToken', newSessionToken, cookieOptions);

            // Mettre à jour l'état utilisateur
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Erreur lors du rafraîchissement de la session:', error);
                logout();
            }
        }
    };

    // Ajoutez une fonction pour vérifier la validité du token
    const isTokenValid = (token) => {
        if (!token) return false;
        // Ajoutez ici votre logique de validation du token si nécessaire
        return true;
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            checkSession,
            refreshSession
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