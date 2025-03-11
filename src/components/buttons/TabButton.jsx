import React from 'react';

const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center px-3 py-2 space-x-2 rounded-lg transition-colors duration-200
            ${isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-400 hover:bg-gray-700'}`}
    >
        <Icon className="w-5 h-5" />
        <span className="hidden sm:inline">{label}</span>
    </button>
);

export default TabButton;