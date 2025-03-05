import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Footer from '../components/Footer.jsx';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        photo: '',
        adresse: '',
        fonction: '',
        id_groupe: 0
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
            // Ici, vous pouvez ajouter la logique pour envoyer les données au serveur
            console.log('Données du formulaire:', formData);
            navigate('/login');
        } catch (error) {
            setError('Une erreur est survenue lors de l\'inscription');
            console.error('Erreur lors de l\'inscription:', error);
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
                            Création de compte
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Créez votre compte pour accéder à l'application
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                                        placeholder="Nom"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        required
                                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                                        placeholder="Prénom"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                                placeholder="Adresse email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                                placeholder="Mot de passe"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <input
                                id="photo"
                                name="photo"
                                type="text"
                                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                                placeholder="URL de la photo"
                                value={formData.photo}
                                onChange={handleChange}
                            />

                            <input
                                id="adresse"
                                name="adresse"
                                type="text"
                                required
                                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                                placeholder="Adresse"
                                value={formData.adresse}
                                onChange={handleChange}
                            />

                            <input
                                id="fonction"
                                name="fonction"
                                type="text"
                                required
                                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                                placeholder="Fonction"
                                value={formData.fonction}
                                onChange={handleChange}
                            />

                            <input
                                id="id_groupe"
                                name="id_groupe"
                                type="number"
                                required
                                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                                placeholder="ID du groupe"
                                value={formData.id_groupe}
                                onChange={handleChange}
                            />
                        </div>

                        {error && (
                            <div className="flex items-center justify-center space-x-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                                <AlertCircle className="h-5 w-5"/>
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex items-center justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Créer le compte
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-sm text-indigo-600 hover:text-indigo-500"
                            >
                                Déjà inscrit ? Connectez-vous
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Register;