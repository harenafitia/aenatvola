import React from 'react';
import { BookOpen, Check } from 'lucide-react';
import BaseCard from '../common/BaseCard';

const MentionCard = ({ mention, viewMode }) => {
    return (
        <div className="h-full">
            <div className="bg-gray-700 rounded-lg p-4 h-full">
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                        <BookOpen className="w-6 h-6 text-blue-400 flex-shrink-0"/>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-white break-words">{mention.name_mention}</h3>
                            <div className="flex items-center mt-2">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    mention.status_mention ? 'bg-green-500' : 'bg-red-500'
                                } text-white inline-block flex items-center gap-1`}>
                                    {mention.status_mention ? 'Actif' : 'Inactif'}
                                    {mention.status_mention && <Check className="w-3 h-3" />}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentionCard;