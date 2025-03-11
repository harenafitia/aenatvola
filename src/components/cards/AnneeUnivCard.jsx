import React from 'react';
import { Calendar, Clock, Timer, Check } from 'lucide-react';
import BaseCard from '../common/BaseCard.jsx';

const getStatutColor = (statut) => {
    switch (statut) {
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

const AnneeUnivCard = ({ annee, viewMode }) => {
    const StatutIcon = (() => {
        switch (annee.statutuniv) {
            case 'en cours':
                return <Clock className="w-4 h-4 text-green-400 flex-shrink-0" />;
            case 'à venir':
                return <Timer className="w-4 h-4 text-blue-400 flex-shrink-0" />;
            case 'terminé':
                return <Check className="w-4 h-4 text-gray-400 flex-shrink-0" />;
            default:
                return null;
        }
    })();

    return (
        <BaseCard viewMode={viewMode}>
            <div className="flex items-start space-x-4">
                <Calendar className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-white break-words">{annee.annee}</h3>
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                        {StatutIcon}
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatutColor(annee.statutuniv)} text-white inline-block`}>
                            {annee.statutuniv}
                        </span>
                    </div>
                </div>
            </div>
        </BaseCard>
    );
};

export default AnneeUnivCard;