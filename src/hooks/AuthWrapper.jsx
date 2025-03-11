import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loading from '../components/common/Loading.jsx';

const AuthWrapper = ({ children }) => {
    const { user, checkSession } = useAuth();
    const location = useLocation();
    const [isChecking, setIsChecking] = useState(true);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    useEffect(() => {
        // Vérifier si la session est valide
        if (!checkSession()) {
            setIsChecking(false); // Session invalide, ne pas bloquer la redirection
        } else {
            setIsChecking(false);
        }
    }, [user]);

    if (isChecking || !isLoadingComplete) {
        return <Loading onLoadingComplete={()=> setIsLoadingComplete(true)} />;
    }

    if (!user || !checkSession()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthWrapper;
