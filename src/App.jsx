import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import AuthWrapper from './hooks/AuthWrapper.jsx';

// Pages publiques
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// Pages protégées
import Dashboard from './pages/Dashboard.jsx';
import Comptes from './pages/Comptes.jsx';
import Depense from './pages/Depense.jsx';
import Membres from './pages/Membres.jsx';
import Parametre from './pages/Parametre.jsx';
import Profil from './pages/Profil.jsx';

// Layout
import Layout from './components/Layout.jsx';

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                {/* Routes publiques */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Routes protégées avec Layout */}
                <Route
                    element={
                        <AuthWrapper>
                            <Layout />
                        </AuthWrapper>
                    }
                >
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/comptes" element={<Comptes />} />
                    <Route path="/depenses" element={<Depense />} />
                    <Route path="/membres" element={<Membres />} />
                    <Route path="/parametres" element={<Parametre />} />
                    <Route path="/profil" element={<Profil />} />
                </Route>

                {/* Redirection par défaut */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;