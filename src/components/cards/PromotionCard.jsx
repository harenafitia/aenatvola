import React from 'react';
import { GraduationCap, Pencil } from 'lucide-react';
import BaseCard from '../common/BaseCard.jsx';

const PromotionCard = ({ promo, viewMode, onEdit }) => {
    return (
        <BaseCard viewMode={viewMode}>
            <div className="flex flex-col h-full">
                <div className="flex items-start justify-between">
                    <div className="flex items-start min-w-0 flex-1">
                        <GraduationCap className="w-6 h-6 text-blue-400 flex-shrink-0 mr-3" />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-white break-words mb-1">{promo.name_prom}</h3>
                            <span className="text-sm text-gray-300 break-words">Année : {promo.annee_prom}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => onEdit(promo)}
                        className="p-1.5 hover:bg-gray-600 rounded-full transition-colors ml-2 flex-shrink-0"
                    >
                        <Pencil className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                </div>
            </div>
        </BaseCard>
    );
};

export default PromotionCard;