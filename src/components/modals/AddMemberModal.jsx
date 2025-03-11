import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddMemberModal = ({ isOpen, onClose, onSubmit }) => {
    const initialFormData = {
        nom_prenom_membre: '',
        com_origin: '',
        adresse_membre: '',
        tel_membre: '',
        id_prom: '',
        id_mention: '',
        id_parcours: '',
        created_at: '',
        created_by: '',
        updated_at: '',
        updated_by: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Désactive le scroll

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    e.preventDefault(); // Empêche la fermeture avec "Escape"
                }
            };


            window.addEventListener('keydown', handleKeyDown);

            return () => {
                document.body.style.overflow = ''; // Réactive le scroll à la fermeture
                window.removeEventListener('keydown', handleKeyDown);
            };

            const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            setFormData({
                ...initialFormData,
                created_at: currentDateTime,
                created_by: 'harenafitia',
                updated_at: currentDateTime,
                updated_by: 'harenafitia'
            });
            setErrors({});
        }
    }, [isOpen]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nom_prenom_membre.trim()) {
            newErrors.nom_prenom_membre = 'Le nom et prénom sont requis';
        } else if (formData.nom_prenom_membre.length < 3) {
            newErrors.nom_prenom_membre = 'Le nom et prénom doivent contenir au moins 3 caractères';
        }

        if (!formData.com_origin.trim()) {
            newErrors.com_origin = 'La commune d\'origine est requise';
        }

        if (!formData.adresse_membre.trim()) {
            newErrors.adresse_membre = 'L\'adresse est requise';
        }

        const phoneRegex = /^(032|033|034|038)\d{7}$/;
        if (!formData.tel_membre.trim()) {
            newErrors.tel_membre = 'Le numéro de téléphone est requis';
        } else if (!phoneRegex.test(formData.tel_membre)) {
            newErrors.tel_membre = 'Format invalide. Utilisez le format: 03X XX XXX XX';
        }

        if (!formData.id_prom.trim()) {
            newErrors.id_prom = 'La promotion est requise';
        } else if (!/^\d{4}$/.test(formData.id_prom)) {
            newErrors.id_prom = 'La promotion doit être une année valide (YYYY)';
        }

        if (!formData.id_mention.trim()) {
            newErrors.id_mention = 'La mention est requise';
        }

        if (!formData.id_parcours.trim()) {
            newErrors.id_parcours = 'Le parcours est requis';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'tel_membre') {
            formattedValue = value.replace(/\D/g, '').slice(0, 10);
        }

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue,
            updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            updated_by: 'harenafitia'
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                await onSubmit(formData);
                setFormData(initialFormData);
                setErrors({});
                onClose();
            } catch (error) {
                console.error('Error submitting form:', error);
                setErrors(prev => ({
                    ...prev,
                    submit: 'Une erreur est survenue lors de la soumission du formulaire'
                }));
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (!isOpen) return null;

    const formFields = [
        {
            name: 'nom_prenom_membre',
            label: 'Nom et Prénom',
            type: 'text',
            placeholder: 'Ex: RAKOTO Jean'
        },
        {
            name: 'com_origin',
            label: 'Commune d\'origine',
            type: 'text',
            placeholder: 'Ex: Antananarivo'
        },
        {
            name: 'adresse_membre',
            label: 'Adresse',
            type: 'text',
            placeholder: 'Ex: Lot IVT 76 Ter Ambohimanarina',
            fullWidth: true
        },
        {
            name: 'tel_membre',
            label: 'Téléphone',
            type: 'tel',
            placeholder: 'Ex: 034XXXXXXX'
        },
        {
            name: 'id_prom',
            label: 'Promotion',
            type: 'text',
            placeholder: 'Ex: 2024'
        },
        {
            name: 'id_mention',
            label: 'Mention',
            type: 'text',
            placeholder: 'Ex: Génie Logiciel'
        },
        {
            name: 'id_parcours',
            label: 'Parcours',
            type: 'text',
            placeholder: 'Ex: Master'
        }
    ];

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center z-50 p-2 md:p-4 overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-gray-800 rounded-lg w-full max-w-xs md:max-w-3xl my-4 md:my-0">
                {/* Header */}
                <div className="sticky top-0 bg-gray-800 rounded-t-lg border-b border-gray-700 p-4 md:p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg md:text-xl font-semibold text-white">Ajouter un nouveau membre</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors rounded-full p-1 hover:bg-gray-700"
                            aria-label="Fermer"
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-4 md:p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {formFields.map((field) => (
                                <div
                                    key={field.name}
                                    className={`space-y-1 ${
                                        field.fullWidth ? 'col-span-1 md:col-span-2' : ''
                                    }`}
                                >
                                    <label className="block text-sm font-medium text-gray-300">
                                        {field.label}
                                        <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        className={`mt-1 w-full rounded-md bg-gray-700 border ${
                                            errors[field.name] ? 'border-red-500' : 'border-gray-600'
                                        } text-white px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                                        required
                                    />
                                    {errors[field.name] && (
                                        <p className="text-xs md:text-sm text-red-500">{errors[field.name]}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {errors.submit && (
                            <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-md">
                                <p className="text-xs md:text-sm text-red-500">{errors.submit}</p>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex flex-col-reverse md:flex-row md:justify-end gap-3 md:space-x-3 pt-4 border-t border-gray-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full md:w-auto px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50 text-sm md:text-base"
                                disabled={isSubmitting}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                        Traitement...
                                    </>
                                ) : (
                                    'Ajouter'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMemberModal;