import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import MembresService from '../../services/Membres.service';

const AddMemberModal = ({ isOpen, onClose, onSubmit }) => {
    const initialFormData = {
        nom_prenom_membre: '',
        com_origin: '',
        adresse_membre: '',
        tel_membre: '',
        num_matricule: '',
        cin_membre: '',
        id_promotion: '',
        id_anneuniv: '',
        id_parcours: '',
        id_mention: '',
        id_niveau: '',
        date_inscrit: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [promotions, setPromotions] = useState([]);
    const [anneesUniversitaires, setAnneesUniversitaires] = useState([]);
    const [parcours, setParcours] = useState([]);
    const [mentions, setMentions] = useState([]);
    const [niveaux, setNiveaux] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1); // Étape actuelle (1 ou 2)

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    const [promos, anneeUnivResponse, parcoursList, mentionsList, niveauxResponse] = await Promise.all([
                        MembresService.getPromotions(),
                        MembresService.getAnneesUniversitaires(),
                        MembresService.getParcours(),
                        MembresService.getMentions(),
                        MembresService.getNiveaux()
                    ]);

                    setPromotions(promos);
                    setAnneesUniversitaires(Array.isArray(anneeUnivResponse) ? anneeUnivResponse : [anneeUnivResponse]);
                    setParcours(parcoursList);
                    setMentions(mentionsList);
                    setNiveaux(Array.isArray(niveauxResponse) ? niveauxResponse : [niveauxResponse]);
                } catch (error) {
                    console.error('Erreur lors du chargement des données:', error);
                }
            };
            fetchData();
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateStep = () => {
        const errors = {};
        if (currentStep === 1) {
            if (!formData.nom_prenom_membre.trim()) errors.nom_prenom_membre = 'Nom et prénom requis';
            if (!formData.com_origin.trim()) errors.com_origin = 'Commune d\'origine requise';
            if (!formData.adresse_membre.trim()) errors.adresse_membre = 'Adresse requise';
            if (!formData.tel_membre.trim()) errors.tel_membre = 'Téléphone requis';
            if (!formData.num_matricule.trim()) errors.num_matricule = 'Numéro matricule requis';
            if (!formData.cin_membre.trim()) errors.cin_membre = 'CIN requis';
        } else if (currentStep === 2) {
            if (!formData.id_promotion) errors.id_promotion = 'Promotion requise';
            if (!formData.id_anneuniv) errors.id_anneuniv = 'Année universitaire requise';
            if (!formData.id_parcours) errors.id_parcours = 'Parcours requis';
            if (!formData.id_mention) errors.id_mention = 'Mention requise';
            if (!formData.id_niveau) errors.id_niveau = 'Niveau requis';
            if (!formData.date_inscrit) errors.date_inscrit = 'Date d\'inscription requise';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep()) return;
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            setFormData(initialFormData);
            onClose();
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
            <div className="bg-gray-800 rounded-lg w-full max-w-3xl mx-4 my-8">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-white">Ajouter un membre</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Étape 1 */}
                    {currentStep === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nom et Prénom */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Nom et Prénom
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nom_prenom_membre"
                                    value={formData.nom_prenom_membre}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.nom_prenom_membre ? 'border-red-500' : 'border-gray-600'}`}
                                />
                                {errors.nom_prenom_membre && <p className="text-red-500 text-sm">{errors.nom_prenom_membre}</p>}
                            </div>

                            {/* Commune d'origine */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Commune d'origine
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="com_origin"
                                    value={formData.com_origin}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.com_origin ? 'border-red-500' : 'border-gray-600'}`}
                                />
                                {errors.com_origin && <p className="text-red-500 text-sm">{errors.com_origin}</p>}
                            </div>

                            {/* Adresse */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Adresse
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="adresse_membre"
                                    value={formData.adresse_membre}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.adresse_membre ? 'border-red-500' : 'border-gray-600'}`}
                                />
                                {errors.adresse_membre && <p className="text-red-500 text-sm">{errors.adresse_membre}</p>}
                            </div>

                            {/* Téléphone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Téléphone
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="tel_membre"
                                    value={formData.tel_membre}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.tel_membre ? 'border-red-500' : 'border-gray-600'}`}
                                />
                                {errors.tel_membre && <p className="text-red-500 text-sm">{errors.tel_membre}</p>}
                            </div>

                            {/* Numéro Matricule */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Numéro Matricule
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="num_matricule"
                                    value={formData.num_matricule}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.num_matricule ? 'border-red-500' : 'border-gray-600'}`}
                                />
                                {errors.num_matricule && <p className="text-red-500 text-sm">{errors.num_matricule}</p>}
                            </div>

                            {/* CIN */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    CIN
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="cin_membre"
                                    value={formData.cin_membre}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.cin_membre ? 'border-red-500' : 'border-gray-600'}`}
                                />
                                {errors.cin_membre && <p className="text-red-500 text-sm">{errors.cin_membre}</p>}
                            </div>
                        </div>
                    )}

                    {/* Étape 2 */}
                    {currentStep === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Promotion */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Promotion
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="id_promotion"
                                    value={formData.id_promotion}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.id_promotion ? 'border-red-500' : 'border-gray-600'}`}
                                >
                                    <option value="">Sélectionnez une promotion</option>
                                    {promotions.map(promo => (
                                        <option key={promo.id_promotion} value={promo.id_promotion}>
                                            {promo.name_promotion}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_promotion && <p className="text-red-500 text-sm">{errors.id_promotion}</p>}
                            </div>

                            {/* Année universitaire */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Année universitaire
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="id_anneuniv"
                                    value={formData.id_anneuniv}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.id_anneuniv ? 'border-red-500' : 'border-gray-600'}`}
                                >
                                    <option value="">Sélectionnez une année</option>
                                    {anneesUniversitaires.map(annee => (
                                        <option key={annee.id_anneuniv} value={annee.id_anneuniv}>
                                            {annee.dateuniv}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_anneuniv && <p className="text-red-500 text-sm">{errors.id_anneuniv}</p>}
                            </div>

                            {/* Parcours */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Parcours
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="id_parcours"
                                    value={formData.id_parcours}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.id_parcours ? 'border-red-500' : 'border-gray-600'}`}
                                >
                                    <option value="">Sélectionnez un parcours</option>
                                    {parcours.map(parcour => (
                                        <option key={parcour.id_parcours} value={parcour.id_parcours}>
                                            {parcour.name_parcours}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_parcours && <p className="text-red-500 text-sm">{errors.id_parcours}</p>}
                            </div>

                            {/* Mention */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Mention
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="id_mention"
                                    value={formData.id_mention}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.id_mention ? 'border-red-500' : 'border-gray-600'}`}
                                >
                                    <option value="">Sélectionnez une mention</option>
                                    {mentions.map(mention => (
                                        <option key={mention.id_mention} value={mention.id_mention}>
                                            {mention.name_mention}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_mention && <p className="text-red-500 text-sm">{errors.id_mention}</p>}
                            </div>

                            {/* Niveau */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Niveau
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="id_niveau"
                                    value={formData.id_niveau}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.id_niveau ? 'border-red-500' : 'border-gray-600'}`}
                                >
                                    <option value="">Sélectionnez un niveau</option>
                                    {niveaux.map(niveau => (
                                        <option key={niveau.id_niveau} value={niveau.id_niveau}>
                                            {niveau.name_niveau}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_niveau && <p className="text-red-500 text-sm">{errors.id_niveau}</p>}
                            </div>

                            {/* Date d'inscription */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Date d'inscription
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="date_inscrit"
                                    value={formData.date_inscrit}
                                    onChange={handleChange}
                                    className={`w-full p-2 bg-gray-700 rounded-md text-white ${errors.date_inscrit ? 'border-red-500' : 'border-gray-600'}`}
                                />
                                {errors.date_inscrit && <p className="text-red-500 text-sm">{errors.date_inscrit}</p>}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between mt-4">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                            >
                                Précédent
                            </button>
                        )}
                        {currentStep < 2 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
                            >
                                Suivant
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'En cours...' : 'Ajouter'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMemberModal;