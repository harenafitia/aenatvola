import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from './layout/Sidebar.jsx';
import Navbar from './layout/Navbar.jsx';

const Layout = () => {
    const { user, logout } = useAuth();

    // Préparer les données utilisateur pour la Navbar
    const userData = {
        name: user?.name || 'Utilisateur',
        photo: user?.photo || '/default-avatar.png',
    };

    return (
        <div className="min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="ml-20 sm:ml-64 flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar
                    title={"R-AENATVola"}
                    user={userData}
                />

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;