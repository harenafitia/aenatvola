import React, { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';

const EditPromotionModal = ({ isOpen, onClose, onSubmit, promotionToEdit }) => {
    const CURRENT_USER = 'harenafitia';
    const CURRENT_DATETIME = '2025-02-20 13:40:25';
    const CURRENT_YEAR = 2025;

    const initialFormData = {
        id_prom: '',
        annee_prom: '',
        name_prom: '',
        created_at: '',
        created_by: '',
        updated_at: CURRENT_DATETIME,
        updated_by: CURRENT_USER
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Générer les années universitaires (5 dernières années jusqu'à 5 ans dans le futur)
    const availableYears = useMemo(() => {
        const years = [];
        for (let i = CURRENT_YEAR - 5; i <= CURRENT_YEAR + 5; i++) {
            years.push({
                value: `${i}-${i + 1}`,
                label: `${i}-${i + 1}`
            });
        }
        return years;
    }, []);

    useEffect(() => {
        if (isOpen && promotionToEdit) {
            document.body.style.overflow = 'hidden';
            setFormData({
                ...promotionToEdit,
                updated_at: CURRENT_DATETIME,
                updated_by: CURRENT_USER
            });
            setErrors({});

            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [isOpen, promotionToEdit]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.annee_prom) {
            newErrors.annee_prom = 'Veuillez sélectionner une année universitaire';
        }

        if (!formData.name_prom.trim()) {
            newErrors.name_prom = 'Le nom de la promotion est requis';
        } else if (formData.name_prom.trim().length < 3) {
            newErrors.name_prom = 'Le nom de la promotion doit contenir au moins 3 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
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
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            setErrors({});
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors(prev => ({
                ...prev,
                submit: 'Une erreur est survenue lors de la modification de la promotion'
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

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
                            Modifier la promotion
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
                        {/* Année universitaire */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Année Universitaire
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                name="annee_prom"
                                value={formData.annee_prom}
                                onChange={handleChange}
                                className={`w-full rounded-md bg-gray-700 border ${
                                    errors.annee_prom ? 'border-red-500' : 'border-gray-600'
                                } text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="">Sélectionnez une année universitaire</option>
                                {availableYears.map(year => (
                                    <option key={year.value} value={year.value}>
                                        {year.label}
                                    </option>
                                ))}
                            </select>
                            {errors.annee_prom && (
                                <p className="text-sm text-red-500">{errors.annee_prom}</p>
                            )}
                        </div>

                        {/* Nom de la promotion */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Nom de la promotion
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="name_prom"
                                value={formData.name_prom}
                                onChange={handleChange}
                                placeholder="Ex: Les Innovateurs"
                                className={`w-full rounded-md bg-gray-700 border ${
                                    errors.name_prom ? 'border-red-500' : 'border-gray-600'
                                } text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.name_prom && (
                                <p className="text-sm text-red-500">{errors.name_prom}</p>
                            )}
                        </div>

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
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                        Traitement...
                                    </>
                                ) : (
                                    'Enregistrer'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPromotionModal;