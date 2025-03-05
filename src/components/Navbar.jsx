import { useState } from 'react';
import PropTypes from 'prop-types';
import { Bell, ChevronDown, X, UserCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = ({ title, user }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        setIsProfileMenuOpen(false);
    };

    return (
        <nav className="relative bg-gray-800">
            {/* Barre de navigation principale */}
            <div className="text-white shadow-md">
                <div className="px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full">
                            {/* Bouton menu mobile */}
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 mr-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-expanded="false"
                            >
                                <span className="sr-only">Ouvrir le menu principal</span>
                                {isMobileMenuOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Section utilisateur - Desktop */}
                        <div className="hidden md:flex md:items-center md:space-x-4">
                            {/* Icône de notification */}
                            <button
                                type="button"
                                className="relative p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <span className="sr-only">Voir les notifications</span>
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-gray-800"></span>
                            </button>

                            {/* Menu utilisateur */}
                            <div className="relative">
                                <button
                                    type="button"
                                    className="flex items-center space-x-3 px-3 py-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                >
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
                                    />
                                    <span className="font-medium text-sm">{user.name}</span>
                                    <ChevronDown className={`w-5 h-5 text-gray-300 transition-transform duration-200 ${isProfileMenuOpen ? 'transform rotate-180' : ''}`} />
                                </button>

                                {/* Menu déroulant */}
                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical">
                                            <Link
                                                to="/profil"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                                onClick={() => setIsProfileMenuOpen(false)}
                                            >
                                                <UserCircle className="w-5 h-5 mr-3" />
                                                Profil
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                <LogOut className="w-5 h-5 mr-3" />
                                                Déconnexion
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 border-t border-gray-700">
                    <button
                        type="button"
                        className="flex items-center w-full px-3 py-2 rounded-md text-white hover:bg-gray-700"
                    >
                        <Bell className="w-6 h-6 mr-3" />
                        <span>Notifications</span>
                    </button>

                    <Link
                        to="/profil"
                        className="flex items-center w-full px-3 py-2 rounded-md text-white hover:bg-gray-700"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <UserCircle className="w-6 h-6 mr-3" />
                        <span>Profil</span>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-3 py-2 rounded-md text-white hover:bg-gray-700"
                    >
                        <LogOut className="w-6 h-6 mr-3" />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default Navbar;