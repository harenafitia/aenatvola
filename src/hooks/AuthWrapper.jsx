import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AuthWrapper = ({ children }) => {
    const { user, checkSession, refreshSession } = useAuth();
    const location = useLocation();

    useEffect(() => {
        // Rafraîchir la session toutes les 30 minutes
        const refreshInterval = setInterval(() => {
            if (checkSession()) {
                refreshSession();
            }
        }, 30 * 60 * 1000); // 30 minutes

        // Rafraîchir la session sur l'activité de l'utilisateur
        const activities = ['mousedown', 'keydown', 'scroll', 'touchstart'];

        let activityTimeout;
        const handleActivity = () => {
            clearTimeout(activityTimeout);
            activityTimeout = setTimeout(() => {
                if (checkSession()) {
                    refreshSession();
                }
            }, 1000); // Délai d'une seconde pour éviter trop d'appels
        };

        activities.forEach(activity => {
            window.addEventListener(activity, handleActivity);
        });

        // Nettoyage
        return () => {
            clearInterval(refreshInterval);
            clearTimeout(activityTimeout);
            activities.forEach(activity => {
                window.removeEventListener(activity, handleActivity);
            });
        };
    }, [refreshSession, checkSession]);

    if (user === null) {
        // Ici, on peut afficher un écran de chargement
        return <div>Chargement...</div>;
    }

    if (!user || !checkSession()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthWrapper;