import React, { useState, useEffect } from 'react';
import {
    Plus,
    Pencil,
    Calendar,
    GraduationCap,
    School,
    Check,
    Clock,
    Timer,
    LayoutGrid,
    List,
    User
} from 'lucide-react';
//importer le Modal Add Annees Univ
import AddAnneesUnivModal from '../components/AddAnneesUnivModal.jsx'
//importer le modal Add Promotion
import AddPromotionModal from '../components/AddPromotionsModal.jsx';
//importer le modal Edit Promotion
import EditPromotionModal from '../components/EditPromotionModal.jsx';

const Parametre = () => {
    const [activeTab, setActiveTab] = useState('annees');
    const [anneesUniv, setAnneesUniv] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [niveaux, setNiveaux] = useState([]);
    const [viewMode, setViewMode] = useState('list'); // 'list' ou 'grid'
    //état pour gérer l'ouverture/fermeture du modal Add Annee Univ
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    //Etat pour gérer l'ouverture/fermeture du modal Add Promotions
    const [isAddPromModalOpen, setIsAddPromModalOpen] = useState(false);
    //Etat pour gerer la modification Promotion dans Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState(null);

    useEffect(() => {
        // Charger et trier les années universitaires
        fetch('/JSON/annees_universitaires.json')
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => b.annee.localeCompare(a.annee));
                setAnneesUniv(sortedData);
            })
            .catch(error => console.error('Erreur lors du chargement des années:', error));

        // Charger et trier les promotions
        fetch('/JSON/promotions.json')
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => b.annee_prom.localeCompare(a.annee_prom));
                setPromotions(sortedData);
            })
            .catch(error => console.error('Erreur lors du chargement des promotions:', error));

        // Charger les niveaux
        fetch('/JSON/niveaux.json')
            .then(response => response.json())
            .then(data => setNiveaux(data))
            .catch(error => console.error('Erreur lors du chargement des niveaux:', error));
    }, []);

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

    const TabButton = ({ id, label, icon: Icon, isActive }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center px-4 py-2 space-x-2 rounded-lg transition-colors duration-200
                ${isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-700'}`}
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </button>
    );

    const ActionButton = ({ icon: Icon, label, color, onClick }) => (
        <button
            onClick={onClick}
            className={`flex items-center px-4 py-2 rounded-full ${color} transition-colors duration-200`}
        >
            <Icon className="w-5 h-5 text-white" />
            <span className="ml-2 text-white">{label}</span>
        </button>
    );

    const ViewToggleButton = ({ isActive, icon: Icon, label, onClick }) => (
        <button
            onClick={onClick}
            className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700'
            }`}
        >
            <Icon className="w-5 h-5" />
            <span className="ml-2">{label}</span>
        </button>
    );

    const AnneeCard = ({ annee }) => (
        <div className={`${viewMode === 'grid' ? 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2' : 'w-full mb-4'}`}>
            <div className="bg-gray-700 rounded-lg p-4 h-full">
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

    const PromotionCard = ({ promo }) => (
        <div className={`${viewMode === 'grid' ? 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2' : 'w-full mb-4'}`}>
            <div className="bg-gray-700 rounded-lg p-4 h-full">
                <div className="flex flex-col h-full">
                    {/* En-tête de la carte avec le bouton d'édition */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <GraduationCap className="w-6 h-6 text-blue-400 flex-shrink-0 mr-3" />
                            <button
                                onClick={() => {
                                    setSelectedPromotion(promo);
                                    setIsEditModalOpen(true);
                                }}
                                className="p-1.5 hover:bg-gray-600 rounded-full transition-colors ml-auto"
                            >
                                <Pencil className="w-4 h-4 text-gray-400 hover:text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Contenu de la carte */}
                    <div className="flex-grow">
                        <h3 className="text-lg font-medium text-white mb-1">{promo.name_prom}</h3>
                        <span className="text-sm text-gray-300">Année : {promo.annee_prom}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const NiveauCard = ({niveau}) => (
        <div className={`${viewMode === 'grid' ? 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2' : 'w-full mb-4'}`}>
            <div className="bg-gray-700 rounded-lg p-4 h-full">
                <div className="flex items-center space-x-4">
                    <School className="w-6 h-6 text-blue-400 flex-shrink-0"/>
                    <div className="flex-grow">
                        <h3 className="text-lg font-medium text-white">{niveau.name_niveau}</h3>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 space-y-6">
            {/* En-tête */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h1 className="text-2xl font-bold text-white">Paramètres</h1>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        <ViewToggleButton
                            isActive={viewMode === 'list'}
                            icon={List}
                            label="Liste"
                            onClick={() => setViewMode('list')}
                        />
                        <ViewToggleButton
                            isActive={viewMode === 'grid'}
                            icon={LayoutGrid}
                            label="Grille"
                            onClick={() => setViewMode('grid')}
                        />
                    </div>
                </div>

                {/* Onglets */}
                <div className="flex flex-wrap gap-2">
                    <TabButton
                        id="annees"
                        label="Années Universitaires"
                        icon={Calendar}
                        isActive={activeTab === 'annees'}
                    />
                    <TabButton
                        id="promotions"
                        label="Promotions"
                        icon={GraduationCap}
                        isActive={activeTab === 'promotions'}
                    />
                    <TabButton
                        id="niveaux"
                        label="Niveaux"
                        icon={School}
                        isActive={activeTab === 'niveaux'}
                    />
                </div>
            </div>

            {/* Contenu */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                {/* Actions */}
                <div className="mb-4 flex flex-wrap gap-2">
                    <ActionButton
                        icon={Plus}
                        label={`Ajouter ${
                            activeTab === 'annees' ? 'une année' :
                                activeTab === 'promotions' ? 'une promotion' : 'un niveau'
                        }`}
                        color="bg-green-600 hover:bg-green-700"
                        //conditions pour ouvrir le modal Add Annee Univ, Promotion, Niveau
                        onClick={() => {
                            if (activeTab === 'annees') {
                                setIsAddModalOpen(true);
                            }else if (activeTab === 'promotions') {
                                setIsAddPromModalOpen(true);
                            }
                            // Ajouter d'autres conditions pour les autres onglets si nécessaire
                        }}
                    />
                    {/* Le bouton Modifier ne s'affiche que si l'onglet actif est "promotions" */}
                    {/*{activeTab === 'promotions' && (*/}
                    {/*    <ActionButton*/}
                    {/*        icon={Pencil}*/}
                    {/*        label="Modifier"*/}
                    {/*        color="bg-gray-700 hover:bg-gray-600"*/}
                    {/*    />*/}
                    {/*)}*/}
                </div>

                {/* Contenu des onglets */}
                <div className={`${viewMode === 'grid' ? 'flex flex-wrap -mx-2' : 'space-y-4'}`}>
                    {/* Années Universitaires */}
                    {activeTab === 'annees' && anneesUniv.map((annee) => (
                        <AnneeCard key={annee.id_anneuniv} annee={annee} />
                    ))}

                    {/* Promotions */}
                    {activeTab === 'promotions' && promotions.map((promo) => (
                        <PromotionCard key={promo.id_prom} promo={promo} />
                    ))}

                    {/* Niveaux */}
                    {activeTab === 'niveaux' && niveaux.map((niveau) => (
                        <NiveauCard key={niveau.id_niveau} niveau={niveau} />
                    ))}
                </div>
            </div>

            {/* Modal pour l'ajout d'année universitaire */}
            <AddAnneesUnivModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={(newAnnee) => {
                    setAnneesUniv(prev => [...prev, newAnnee].sort((a, b) => b.annee.localeCompare(a.annee)));
                    setIsAddModalOpen(false);
                }}
            />
            {/* Modal pour l'ajout de promotion */}
            <AddPromotionModal
                isOpen={isAddPromModalOpen}
                onClose={() => setIsAddPromModalOpen(false)}
                onSubmit={(newPromotion) => {
                    setPromotions(prev => [...prev, newPromotion].sort((a, b) =>
                        b.annee_prom.localeCompare(a.annee_prom)
                    ));
                    setIsAddPromModalOpen(false);
                }}
            />
            {/* Modal pour la modification de promotion */}
            <EditPromotionModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedPromotion(null);
                }}
                promotionToEdit={selectedPromotion}
                onSubmit={(updatedPromotion) => {
                    setPromotions(prev =>
                        prev.map(p =>
                            p.id_prom === updatedPromotion.id_prom ? updatedPromotion : p
                        ).sort((a, b) => b.annee_prom.localeCompare(a.annee_prom))
                    );
                    setIsEditModalOpen(false);
                    setSelectedPromotion(null);
                }}
            />
        </div>
    );
};

export default Parametre;