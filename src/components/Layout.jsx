import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from './layout/Sidebar.jsx';
import Navbar from './layout/Navbar.jsx';

const Layout = () => {
    const { user } = useAuth();

    // Préparer les données utilisateur pour la Navbar
    const userData = {
        name: user?.name || 'Utilisateur',
        image: user?.photo || '/default-avatar.png', // Notez le changement de photo à image
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar - fixed */}
            <Sidebar className="fixed left-0 top-0 h-screen z-30" />

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col ml-20 sm:ml-64 min-h-screen">
                {/* Navbar - fixed */}
                <Navbar
                    title="R-AENATVola"
                    user={userData}
                    className="fixed top-0 right-0 left-20 sm:left-64 z-20 w-auto"
                />

                {/* Content Area - scrollable */}
                <main className="flex-1 mt-16 relative">
                    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;