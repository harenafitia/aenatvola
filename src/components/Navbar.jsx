
import PropTypes from 'prop-types';
import { Bell, ChevronDown } from 'lucide-react';

const Navbar = ({ title, user }) => {
    return (
        <div className="text-white flex items-center justify-between p-4 shadow-md">
            {/* Titre de la page active */}
            <h1 className="text-2xl font-bold">{title}</h1>

            {/* Section utilisateur */}
            <div className="flex items-center space-x-4">
                {/* Icône de notification */}
                <Bell className="w-6 h-6" />

                {/* Image de l'utilisateur et nom */}
                <div className="flex items-center space-x-2">
                    <img
                        src={user.image}
                        alt="User"
                        className="w-8 h-8 rounded-full"
                    />
                    <span className="font-regular">{user.name}</span>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </div>
        </div>
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