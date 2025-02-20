import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Wallet,
    Receipt,
    Settings,
    UserCircle,
    LogOut,
    Menu,
    X
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Gestion du responsive
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fermer le sidebar sur mobile lors du changement de route
    useEffect(() => {
        if (isMobile) {
            setIsOpen(false);
        }
    }, [location, isMobile]);

    const isActive = (path) => {
        return location.pathname === path;
    };

    const NavLink = ({ to, icon: Icon, children }) => {
        const active = isActive(to);
        return (
            <Link
                to={to}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200
                    ${active
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-gray-800'
                }
                    ${isMobile ? 'justify-start' : 'justify-center sm:justify-start'}
                `}
                onClick={() => isMobile && setIsOpen(false)}
            >
                <Icon className={`w-5 h-5 flex-shrink-0`} />
                <span className={`ml-3 font-medium whitespace-nowrap
                    ${isMobile ? 'block' : 'hidden sm:block'}`}>
                    {children}
                </span>
            </Link>
        );
    };

    // Overlay pour mobile
    const Overlay = () => (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-20
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsOpen(false)}
        />
    );

    return (
        <>
            {/* Bouton Menu Mobile */}
            <button
                className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <Menu className="w-6 h-6 text-white" />
                )}
            </button>

            {/* Overlay Mobile */}
            <Overlay />

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full bg-black flex flex-col z-30
                transition-all duration-300 ease-in-out
                ${isMobile
                ? `w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
                : 'w-20 sm:w-64 translate-x-0'
            }`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <div className={`flex items-center
                        ${isMobile ? 'justify-start' : 'justify-center sm:justify-start'}`}
                    >
                        <img
                            src="/Logo.jpg"
                            alt="Logo"
                            className="w-8 h-8 rounded-full"
                            loading="lazy"
                        />
                        <h1 className={`text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent ml-3
                            ${isMobile ? 'block' : 'hidden sm:block'}`}>
                            R-AENATVola
                        </h1>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                    <NavLink to="/" icon={LayoutDashboard}>Dashboard</NavLink>
                    <NavLink to="/membres" icon={Users}>Membres</NavLink>
                    <NavLink to="/compte" icon={Wallet}>Compte</NavLink>
                    {/*<NavLink to="/depense" icon={Receipt}>Dépense</NavLink>*/}
                    <NavLink to="/parametre" icon={Settings}>Paramètre</NavLink>
                    <NavLink to="/profil" icon={UserCircle}>Profil</NavLink>
                </nav>

                {/* Déconnexion */}
                <div className="p-4 border-t border-gray-800">
                    <button
                        className={`flex items-center w-full px-4 py-3 rounded-lg
                            bg-gray-900 hover:bg-gray-800 transition-colors duration-200
                            ${isMobile ? 'justify-start' : 'justify-center sm:justify-start'}`}
                        onClick={() => {/* Logic de déconnexion */}}
                    >
                        <LogOut className="w-5 h-5 text-white flex-shrink-0" />
                        <span className={`ml-3 font-medium text-white
                            ${isMobile ? 'block' : 'hidden sm:inline-block'}`}>
                            Déconnexion
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;