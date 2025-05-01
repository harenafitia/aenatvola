import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from './layout/Sidebar.jsx';
import Navbar from './layout/Navbar.jsx';

const Layout = () => {
    const { user } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const userData = {
        name: user?.name || 'Utilisateur',
        role: user?.roleDescription || '',
        image: user?.photo || '/default-avatar.png',
    };

    return (
        <div className="min-h-screen flex">
            <Sidebar
                className="fixed left-0 top-0 h-screen z-30"
                onCollapse={(collapsed) => setIsCollapsed(collapsed)}
            />

            <div className={`flex-1 flex flex-col transition-all duration-300
                ${isCollapsed ? 'ml-20' : 'ml-20 sm:ml-64'} min-h-screen`}>
                <Navbar
                    title="R-AENATVola"
                    user={userData}
                    className={`fixed top-0 right-0 transition-all duration-300
                        ${isCollapsed ? 'left-20' : 'left-20 sm:left-64'} z-20 w-auto`}
                />

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