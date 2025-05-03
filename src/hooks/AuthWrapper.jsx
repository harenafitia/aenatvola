import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loading from '../components/common/Loading.jsx';

const AuthWrapper = ({ children }) => {
    const { user, isLoading } = useAuth(); // Utilisez uniquement `user` et `isLoading` depuis le contexte Auth
    const location = useLocation();
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    if (isLoading || !isLoadingComplete) {
        return <Loading onLoadingComplete={() => setIsLoadingComplete(true)} />;
    }

    if (!user) {
        // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthWrapper;