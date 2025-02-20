import { useState, useEffect } from 'react';
import { Camera, Mail, Phone, MapPin, Save, Edit, X, Lock, Eye, EyeOff } from 'lucide-react';

const Profil = () => {
    const [userInfo, setUserInfo] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        photo: null
    });

    const [passwordInfo, setPasswordInfo] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
    const [previewImage, setPreviewImage] = useState(null);
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const [passwordErrors, setPasswordErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Simuler le chargement des données utilisateur
        setTimeout(() => {
            setUserInfo({
                nom: 'Doe',
                prenom: 'John',
                email: 'john.doe@example.com',
                telephone: '+261 34 00 000 00',
                adresse: 'Antananarivo, Madagascar',
                photo: null
            });
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validation du mot de passe
            if (isEditing && passwordInfo.newPassword) {
                const errors = {};

                if (!passwordInfo.currentPassword) {
                    errors.currentPassword = 'Le mot de passe actuel est requis';
                }

                if (passwordInfo.newPassword.length < 8) {
                    errors.newPassword = 'Le nouveau mot de passe doit contenir au moins 8 caractères';
                }

                if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
                    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
                }

                if (Object.keys(errors).length > 0) {
                    setPasswordErrors(errors);
                    return;
                }
            }

            // TODO: Implémenter l'appel API pour mettre à jour les informations
            setIsEditing(false);
            setPasswordInfo({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setPasswordErrors({});
            // Afficher un message de succès
        } catch (err) {
            setError('Une erreur est survenue lors de la mise à jour du profil.');
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordInfo(prev => ({
            ...prev,
            [name]: value
        }));
        // Effacer l'erreur correspondante lors de la modification
        if (passwordErrors[name]) {
            setPasswordErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setUserInfo(prev => ({ ...prev, photo: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const ProfileHeader = () => (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-gray-800 p-4 rounded-lg">
            <h1 className="text-2xl font-bold text-white mb-4 sm:mb-0">Mon Profil</h1>
            <div className="flex gap-2">
                {isEditing ? (
                    <>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setPreviewImage(null);
                            }}
                            className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors flex items-center gap-2"
                        >
                            <X className="w-5 h-5" />
                            <span>Annuler</span>
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-500 transition-colors flex items-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            <span>Enregistrer</span>
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors flex items-center gap-2"
                    >
                        <Edit className="w-5 h-5" />
                        <span>Modifier</span>
                    </button>
                )}
            </div>
        </div>
    );

    const ProfileImage = () => (
        <div className="flex justify-center mb-6">
            <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    {previewImage || userInfo.photo ? (
                        <img
                            src={previewImage || userInfo.photo}
                            alt="Photo de profil"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-4xl text-white">
                            {userInfo.prenom[0]}{userInfo.nom[0]}
                        </span>
                    )}
                </div>
                {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-500 transition-colors">
                        <Camera className="h-5 w-5 text-white" />
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                )}
            </div>
        </div>
    );

    const FormField = ({ label, name, type = 'text', icon = null }) => (
        <div className={`${name === 'adresse' ? 'col-span-full' : ''}`}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {icon}
                    </span>
                )}
                {name === 'adresse' ? (
                    <textarea
                        name={name}
                        value={userInfo[name]}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows="3"
                        className={`w-full p-2 ${icon ? 'pl-10' : ''} bg-gray-700 text-white border border-gray-600 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-800 disabled:cursor-not-allowed
                        transition-colors`}
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={userInfo[name]}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full p-2 ${icon ? 'pl-10' : ''} bg-gray-700 text-white border border-gray-600 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-800 disabled:cursor-not-allowed
                        transition-colors`}
                    />
                )}
            </div>
        </div>
    );

    const PasswordFields = () => {
        if (!isEditing) return null;

        const renderPasswordField = (label, name) => (
            <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {label}
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Lock className="w-5 h-5" />
                    </span>
                    <input
                        type={showPasswords[name] ? 'text' : 'password'}
                        name={name}
                        value={passwordInfo[name]}
                        onChange={handlePasswordChange}
                        className={`w-full p-2 pl-10 bg-gray-700 text-white border ${
                            passwordErrors[name] ? 'border-red-500' : 'border-gray-600'
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({
                            ...prev,
                            [name]: !prev[name]
                        }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                        {showPasswords[name] ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                </div>
                {passwordErrors[name] && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors[name]}</p>
                )}
            </div>
        );

        return (
            <div className="mt-8 border-t border-gray-700 pt-6">
                <h2 className="text-xl font-semibold text-white mb-4">Modifier le mot de passe</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderPasswordField('Mot de passe actuel', 'currentPassword')}
                    {renderPasswordField('Nouveau mot de passe', 'newPassword')}
                    <div className="md:col-span-2">
                        {renderPasswordField('Confirmer le nouveau mot de passe', 'confirmPassword')}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 p-4">
            <div className="max-w-4xl mx-auto">
                <ProfileHeader />

                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    {error && (
                        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <ProfileImage />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Prénom" name="prenom" />
                            <FormField label="Nom" name="nom" />
                            <FormField label="Email" name="email" type="email" icon={<Mail className="w-5 h-5" />} />
                            <FormField label="Téléphone" name="telephone" type="tel" icon={<Phone className="w-5 h-5" />} />
                            <FormField label="Adresse" name="adresse" icon={<MapPin className="w-5 h-5" />} />
                        </div>

                        <PasswordFields />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profil;