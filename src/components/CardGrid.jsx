import React from 'react';
import AnneeUnivCard from './cards/AnneeUnivCard.jsx';
import PromotionCard from './cards/PromotionCard.jsx';
import NiveauCard from './cards/NiveauxCard.jsx';
import MentionCard from './cards/MentionCard.jsx';

const CardGrid = ({
                      items,
                      activeTab,
                      viewMode,
                      onEditPromotion,
                      searchTerm
                  }) => {
    if (items.length === 0) {
        return (
            <div className="col-span-full text-center py-8">
                <p className="text-gray-400">
                    Aucun résultat trouvé pour "{searchTerm}"
                </p>
            </div>
        );
    }

    const renderCard = (item) => {
        switch (activeTab) {
            case 'annees':
                return <AnneeUnivCard key={item.id_anneuniv} annee={item} viewMode={viewMode} />;
            case 'promotions':
                return <PromotionCard
                    key={item.id_prom}
                    promo={item}
                    viewMode={viewMode}
                    onEdit={onEditPromotion}
                />;
            case 'niveaux':
                return <NiveauCard key={item.id_niveau} niveau={item} viewMode={viewMode} />;
            case 'mentions':
                return <MentionCard key={item.id_mention} mention={item} viewMode={viewMode} />;
            default:
                return null;
        }
    };

    return (
        <div className={`${
            viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                : 'flex flex-col space-y-4'
        } mb-6`}>
            {items.map(renderCard)}
        </div>
    );
};

export default CardGrid;