import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Wallet,
    Settings,
    Menu,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const Sidebar = ({ className, onCollapse }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);
            if (isMobileView) {
                setIsOpen(false);
                setIsCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) {
            setIsOpen(false);
        }
    }, [location, isMobile]);

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, icon: Icon, children }) => {
        const active = isActive(to);
        return (
            <Link
                to={to}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group
                    ${active ? 'bg-white text-black' : 'text-white hover:bg-gray-800'}
                    ${isMobile ? 'justify-start' : 'justify-center sm:justify-start'}`}
                onClick={() => isMobile && setIsOpen(false)}
            >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {(!isCollapsed || isMobile) && (
                    <span className={`ml-3 font-medium whitespace-nowrap transition-all duration-200
                        ${isMobile ? 'block' : 'hidden sm:block'}
                        ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                        {children}
                    </span>
                )}
                {isCollapsed && !isMobile && (
                    <span className="absolute left-full ml-2 p-2 bg-gray-800 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                        {children}
                    </span>
                )}
            </Link>
        );
    };

    const Overlay = () => (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-20
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsOpen(false)}
        />
    );

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        onCollapse(!isCollapsed);
    };

    return (
        <>
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

            <Overlay />

            <aside className={`fixed top-0 left-0 h-full bg-black flex flex-col z-30
                transition-all duration-300 ease-in-out
                ${isMobile
                ? `w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
                : `${isCollapsed ? 'w-20' : 'w-64'} translate-x-0`}
                ${className}`}
            >
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <div className={`flex items-center
                        ${isMobile ? 'justify-start' : 'justify-center sm:justify-start'}`}>
                        <img
                            src="/Logo.jpg"
                            alt="Logo"
                            className="w-8 h-8 rounded-full"
                            loading="lazy"
                        />
                        {(!isCollapsed || isMobile) && (
                            <h1 className={`text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent ml-3
                                ${isMobile ? 'block' : 'hidden sm:block'}
                                ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                                R-AENATVola
                            </h1>
                        )}
                    </div>

                    {!isMobile && (
                        <button
                            onClick={toggleCollapse}
                            className="p-1 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-white"
                            aria-label={isCollapsed ? "Développer" : "Réduire"}
                        >
                            {isCollapsed ? (
                                <ChevronRight className="w-5 h-5" />
                            ) : (
                                <ChevronLeft className="w-5 h-5" />
                            )}
                        </button>
                    )}
                </div>

                <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                    <NavLink to="/" icon={LayoutDashboard}>Dashboard</NavLink>
                    <NavLink to="/membres" icon={Users}>Membres</NavLink>
                    <NavLink to="/comptes" icon={Wallet}>Compte</NavLink>
                    <NavLink to="/parametres" icon={Settings}>Paramètre</NavLink>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;