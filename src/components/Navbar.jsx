import { useState } from 'react';
import PropTypes from 'prop-types';
import { Bell, ChevronDown, X } from 'lucide-react';

const Navbar = ({ title, user }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="relative bg-gray-800">
            {/* Barre de navigation principale */}
            <div className="text-white shadow-md">
                <div className="px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Titre et bouton menu mobile */}
                        <div className="flex items-center justify-between w-full">
                            {/* Titre */}
                            <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>

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
                                {/* Badge de notification */}
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-gray-800"></span>
                            </button>

                            {/* Menu utilisateur */}
                            <div className="relative">
                                <button
                                    type="button"
                                    className="flex items-center space-x-3 px-3 py-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
                                    />
                                    <span className="font-medium text-sm">{user.name}</span>
                                    <ChevronDown className="w-8 h-8 text-gray-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 border-t border-gray-700">
                    {/* Section notifications mobile */}
                    <button
                        type="button"
                        className="flex items-center w-full px-3 py-2 rounded-md text-white hover:bg-gray-700"
                    >
                        <Bell className="w-6 h-6 mr-3" />
                        <span>Notifications</span>
                    </button>

                    {/* Section utilisateur mobile */}
                    <div className="px-3 py-2">
                        <div className="flex items-center space-x-3">
                            <div className="flex-1">
                                <div className="font-medium">{user.name}</div>
                                <button
                                    type="button"
                                    className="text-sm text-gray-300 hover:text-white"
                                >
                                    Voir le profil
                                </button>
                            </div>
                        </div>
                    </div>
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