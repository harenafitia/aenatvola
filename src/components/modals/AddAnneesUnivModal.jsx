import React, { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';

const AddAnneesUnivModal = ({ isOpen, onClose, onSubmit }) => {
    const CURRENT_USER = 'harenafitia';
    const CURRENT_DATETIME = '2025-02-20 11:56:06';
    const CURRENT_YEAR = 2025; // Année actuelle

    const initialFormData = {
        annee: '',
        statutuniv: '',
        created_at: CURRENT_DATETIME,
        created_by: CURRENT_USER,
        updated_at: CURRENT_DATETIME,
        updated_by: CURRENT_USER
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Générer les 5 dernières années et les 5 prochaines années
    const availableYears = useMemo(() => {
        const years = [];
        for (let i = CURRENT_YEAR - 5; i <= CURRENT_YEAR + 5; i++) {
            years.push({
                value: `${i}-${i + 1}`,
                startYear: i,
                label: `${i}-${i + 1}`
            });
        }
        return years;
    }, []);

    // Déterminer automatiquement le statut en fonction de l'année sélectionnée
    const determineStatus = (yearRange) => {
        if (!yearRange) return '';

        const startYear = parseInt(yearRange.split('-')[0]);

        if (startYear < CURRENT_YEAR) {
            return 'terminé';
        } else if (startYear === CURRENT_YEAR) {
            return 'en cours';
        } else {
            return 'à venir';
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setFormData(initialFormData);
            setErrors({});

            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newStatus = determineStatus(value);

        setFormData(prev => ({
            ...prev,
            [name]: value,
            statutuniv: newStatus,
            updated_at: CURRENT_DATETIME,
            updated_by: CURRENT_USER
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
        if (!formData.annee) {
            setErrors({ annee: 'Veuillez sélectionner une année universitaire' });
            return;
        }

        setIsSubmitting(true);
        try {
            const submissionData = {
                ...formData,
                id_anneuniv: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            };
            await onSubmit(submissionData);
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
    };

    if (!isOpen) return null;

    const getStatusClass = (status) => {
        switch (status) {
            case 'terminé':
                return 'bg-gray-500';
            case 'en cours':
                return 'bg-green-500';
            case 'à venir':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="bg-gray-800 rounded-lg w-full max-w-md">
                {/* Header */}
                <div className="border-b border-gray-700 p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-white">
                            Ajouter une année universitaire
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors rounded-full p-1 hover:bg-gray-700"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Année Universitaire
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                name="annee"
                                value={formData.annee}
                                onChange={handleChange}
                                className={`w-full rounded-md bg-gray-700 border ${
                                    errors.annee ? 'border-red-500' : 'border-gray-600'
                                } text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="">Sélectionnez une année</option>
                                {availableYears.map(year => (
                                    <option key={year.value} value={year.value}>
                                        {year.label}
                                    </option>
                                ))}
                            </select>
                            {errors.annee && (
                                <p className="text-sm text-red-500">{errors.annee}</p>
                            )}
                        </div>

                        {formData.annee && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Statut
                                </label>
                                <div className={`inline-flex items-center px-3 py-1 rounded-full ${getStatusClass(formData.statutuniv)} text-white text-sm`}>
                                    {formData.statutuniv}
                                </div>
                            </div>
                        )}

                        {errors.submit && (
                            <div className="p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-md">
                                <p className="text-sm text-red-500">{errors.submit}</p>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                                disabled={isSubmitting}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors disabled:opacity-50 flex items-center gap-2"
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

export default AddAnneesUnivModal;