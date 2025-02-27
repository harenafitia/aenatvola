import React, {Suspense, lazy} from 'react';
import {Route, Routes, useLocation, Navigate} from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Membres = lazy(() => import('./pages/Membres.jsx'));
const Compte = lazy(() => import('./pages/Comptes.jsx'));
const Depense = lazy(() => import('./pages/Depense.jsx'));
const Parametre = lazy(() => import('./pages/Parametre.jsx'));
const Profil = lazy(() => import('./pages/Profil.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));

// Valeurs par défaut pour l'utilisateur
const defaultUser = {
    image: "/default-avatar.jpg", // Image par défaut
    role: "Utilisateur" // Rôle par défaut
};

// Composant PrivateRoute
const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};


const App = () => {
    const location = useLocation();
    const titles = {
        "/": "Dashboard",
        "/membres": "Membres",
        "/compte": "Compte",
        "/depense": "Dépense",
        "/parametre": "Paramètre",
        "/profil": "Profil",
        "/login": "Login"
    };
    const title = titles[location.pathname] || "AENATVola";

    // Vérifier si l'utilisateur est connecté
    const user = JSON.parse(localStorage.getItem('user')) || defaultUser;

    // Ne pas afficher Sidebar et Navbar sur la page de connexion
    if (location.pathname === '/login') {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    // Assurer qu'on a un utilisateur connecté avant d'afficher le layout principal
    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex">
            <Sidebar/>
            <div className="ml-16 md:ml-64 w-full">
                <Navbar title={title} user={{
                    name: user.nom,
                    image: user.photo_profil || defaultUserData.image,
                }} />
                <div className="p-4">
                    <Suspense fallback={<div>Chargement...</div>}>
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/" element={
                                <PrivateRoute>
                                    <Dashboard/>
                                </PrivateRoute>
                            }/>
                            <Route path="/membres" element={
                                <PrivateRoute>
                                    <Membres/>
                                </PrivateRoute>
                            }/>
                            <Route path="/compte" element={
                                <PrivateRoute>
                                    <Compte/>
                                </PrivateRoute>
                            }/>
                            <Route path="/depense" element={
                                <PrivateRoute>
                                    <Depense/>
                                </PrivateRoute>
                            }/>
                            <Route path="/parametre" element={
                                <PrivateRoute>
                                    <Parametre/>
                                </PrivateRoute>
                            }/>
                            <Route path="/profil" element={
                                <PrivateRoute>
                                    <Profil/>
                                </PrivateRoute>
                            }/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default App;