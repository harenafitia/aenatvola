import React from 'react';
import { School } from 'lucide-react';
import BaseCard from '../common/BaseCard';

const NiveauCard = ({ niveau, viewMode }) => {
    return (
        <BaseCard viewMode={viewMode}>
            <div className="flex items-start space-x-4">
                <School className="w-6 h-6 text-blue-400 flex-shrink-0"/>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-white break-words">{niveau.name_niveau}</h3>
                </div>
            </div>
        </BaseCard>
    );
};

export default NiveauCard;