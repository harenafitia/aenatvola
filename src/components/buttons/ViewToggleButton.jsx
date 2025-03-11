import React from 'react';

const ViewToggleButton = ({ isActive, icon: Icon, label, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
        }`}
    >
        <Icon className="w-5 h-5" />
        <span className="hidden sm:inline ml-2">{label}</span>
    </button>
);

export default ViewToggleButton;