import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react'; // Import des icônes
import { useAuth } from '../context/AuthContext.jsx';
import Footer from '../components/layout/Footer.jsx';
import axiosInstance from '../axiosConfig'; // Import de l'instance Axios configurée

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth(); // Utilisation du hook useAuth
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axiosInstance.post('/auth/login', formData);
            const { accessToken } = response.data;

            if (!accessToken) {
                throw new Error('Token non reçu');
            }

            const userData = {
                email: formData.usernameOrEmail,
                token: accessToken,
            };

            await login(userData); // Attendez que login soit terminé

            // Redirection vers la page précédente ou la page d'accueil
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Erreur de connexion:', error);
            if (error.response) {
                // Log plus détaillé de la réponse d'erreur
                console.log('Error response:', error.response.data);
                setError(error.response.data.message || 'Identifiant ou mot de passe incorrect');
            } else {
                setError('Erreur de connexion au serveur');
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-100">
            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 p-8 rounded-xl">
                    <div className="text-center">
                        <img
                            src="/Logo.jpg"
                            alt="Logo"
                            loading="lazy"
                            className="mx-auto w-24 h-24 object-contain"
                        />
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Connexion
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Accédez à votre compte
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    id="usernameOrEmail"
                                    name="usernameOrEmail"
                                    type="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
                                    placeholder="Votre email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
                                    placeholder="Votre mot de passe"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {error && (
                            <div
                                className="flex items-center justify-center space-x-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                                <AlertCircle className="h-5 w-5"/>
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex items-center justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                Se connecter
                            </button>
                        </div>

                        {/*Lien Page Inscription*/}
                        <div className="text-center mt-4">
                            <Link
                                to="/register"
                                className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                            >
                                Pas encore de compte ? Inscrivez-vous
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;