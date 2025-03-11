import React from 'react';

const BaseCard = ({ children, viewMode = 'grid' }) => {
    return (
        <div className="h-full">
            <div className="bg-gray-700 rounded-lg p-4 h-full">
                {children}
            </div>
        </div>
    );
};

export default BaseCard;