import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Wallet,
    Receipt,
    Settings,
    UserCircle,
    LogOut,
    Menu
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path;
    };

    const NavLink = ({ to, icon: Icon, children }) => {
        const active = isActive(to);
        return (
            <Link
                to={to}
                className={`flex items-center justify-center md:justify-start px-2 md:px-4 py-3 rounded-full transition-all duration-200 group w-full
                    ${active
                    ? 'bg-white'
                    : 'hover:bg-gray-800'
                }`}
            >
                <Icon
                    className={`w-5 h-5 
                        ${active
                        ? 'text-black'
                        : 'text-white'
                    }`}
                />
                <span className={`ml-3 font-medium hidden md:block
                    ${active ? 'text-black' : 'text-white'}`}>
                    {children}
                </span>
            </Link>
        );
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Bouton de menu pour petits écrans */}
            <button
                className="fixed top-4 left-4 z-50 md:hidden"
                onClick={toggleSidebar}
            >
                <Menu className="text-white" />
            </button>

            <div className={`fixed h-full bg-black text-white flex flex-col shadow-xl transition-all duration-300 ease-in-out 
                ${isOpen ? 'w-64' : 'w-16'} md:w-64
                ${isOpen ? 'left-0' : '-left-full'} md:left-0`}
            >
                {/* Entête */}
                <div className="p-6 border-b border-gray-800 flex justify-center md:justify-start">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hidden md:block">
                        AENATVola
                    </h1>
                </div>

                {/* Éléments de Navigation */}
                <nav className="flex flex-col flex-grow space-y-1 p-4">
                    <NavLink to="/" icon={LayoutDashboard}>Dashboard</NavLink>
                    <NavLink to="/membres" icon={Users}>Membres</NavLink>
                    <NavLink to="/compte" icon={Wallet}>Compte</NavLink>
                    <NavLink to="/depense" icon={Receipt}>Dépense</NavLink>
                    <NavLink to="/parametre" icon={Settings}>Paramètre</NavLink>
                    <NavLink to="/profil" icon={UserCircle}>Profil</NavLink>
                </nav>

                {/* Bouton de Déconnexion */}
                <div className="p-4 border-t border-gray-800">
                    <button className="flex items-center justify-center md:justify-start w-full px-2 md:px-4 py-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-200 group">
                        <LogOut className="w-5 h-5 text-white" />
                        <span className="ml-3 font-medium text-white hidden md:block">
                            Déconnexion
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;