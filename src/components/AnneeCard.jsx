import React from 'react';
import { Calendar, Clock, Timer, Check } from 'lucide-react';

const AnneeCard = ({ annee, viewMode }) => {
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

    return (
        <div className={`${viewMode === 'grid' ? 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2' : 'w-full mb-4'}`}>
            <div className="bg-gray-700 rounded-lg p-4 h-full hover:bg-gray-600 transition-colors duration-200">
                <div className="flex items-center space-x-4">
                    <Calendar className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <div className="flex-grow">
                        <h3 className="text-lg font-medium text-white">{annee.annee}</h3>
                        <div className="flex items-center space-x-2 mt-2">
                            {annee.statutuniv === 'en cours' && <Clock className="w-4 h-4 text-green-400" />}
                            {annee.statutuniv === 'à venir' && <Timer className="w-4 h-4 text-blue-400" />}
                            {annee.statutuniv === 'terminé' && <Check className="w-4 h-4 text-gray-400" />}
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatutColor(annee.statutuniv)} text-white`}>
                                {annee.statutuniv}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnneeCard;