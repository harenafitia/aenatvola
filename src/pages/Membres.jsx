import React, { useState, useEffect, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import { Plus, ChevronDown, Download, Phone, MapPin, School, Edit, Trash2 } from "lucide-react";
import AddMemberModal from '../components/modals/AddMemberModal.jsx';
import MembresService from '../services/Membres.service.js';

const Membres = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null); // Membre en cours d'édition
    const [sorting, setSorting] = useState([]);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    useEffect(() => {
        const loadMembres = async () => {
            try {
                const membres = await MembresService.getAllMembres();
                setData(membres);
            } catch (error) {
                console.error('Erreur lors du chargement des membres:', error);
                setData([]);
            }
        };

        loadMembres();
    }, []);

    const handleAddMember = async (newMember) => {
        try {
            // Appel pour ajouter le membre
            const response = await MembresService.createMembre({
                createMembreDto: {
                    nom_prenom_membre: newMember.nom_prenom_membre,
                    com_origin: newMember.com_origin,
                    adresse_membre: newMember.adresse_membre,
                    tel_membre: newMember.tel_membre,
                    id_promotion: newMember.id_promotion
                },
                id_anneuniv: newMember.id_anneuniv,
                id_parcours: newMember.id_parcours,
                id_mention: newMember.id_mention,
                id_niveau: newMember.id_niveau,
                date_inscrit: newMember.date_inscrit
            });

            // Appel pour récupérer les données complètes du membre ajouté
            const addedMember = await MembresService.getMembreById(response.id_membre);

            // Met à jour la liste des membres avec le nouveau membre
            setData(prevData => [...prevData, addedMember]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du membre:', error);
        }
    };

    const handleDeleteMember = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
            try {
                await MembresService.deleteMembreById(id); // Appel à l'endpoint DELETE
                setData(prevData => prevData.filter(member => member.id_membre !== id));
            } catch (error) {
                console.error('Erreur lors de la suppression du membre:', error);
            }
        }
    };

    const handleEditMember = (member) => {
        setEditingMember(member);
        setIsModalOpen(true); // Réutilise le modal pour l'édition
    };

    const handleDownload = () => {
        const csvContent = [
            ["ID", "Nom et Prénom", "Commune d'origine", "Adresse", "Téléphone", "Promotion"].join(','),
            ...data.map(row =>
                [
                    row.id_membre,
                    row.nom_prenom_membre,
                    row.com_origin,
                    row.adresse_membre,
                    row.tel_membre,
                    row.promotion?.name_promotion || ''
                ].join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'membres.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id_membre',
            sortingFn: 'alphanumeric'
        },
        {
            header: 'Nom et Prénom',
            accessorKey: 'nom_prenom_membre',
        },
        {
            header: 'Commune d\'origine',
            accessorKey: 'com_origin',
        },
        {
            header: 'Adresse',
            accessorKey: 'adresse_membre',
        },
        {
            header: 'Téléphone',
            accessorKey: 'tel_membre',
        },
        {
            header: 'Promotion',
            accessorKey: 'promotion.name_promotion',
            cell: ({ row }) => {
                const promotion = row.original.promotion;
                if (!promotion) return 'N/A';
                return `${promotion.name_promotion} (${promotion.annee_promotion})`;
            }
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleEditMember(row.original)}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Modifier"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleDeleteMember(row.original.id_membre)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Supprimer"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            )
        }
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
            sorting,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    const renderTableOrCards = () => {
        if (isMobileView) {
            return (
                <div className="mt-4">
                    {table.getRowModel().rows.map(row => (
                        <div key={row.id} className="bg-gray-800 p-4 rounded-lg mb-4 shadow-lg">
                            {/* Carte Mobile */}
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div className="mt-4 overflow-x-auto rounded-lg">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white cursor-pointer hover:bg-gray-700"
                                >
                                    <div className="flex items-center gap-2">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getIsSorted() ? (
                                            header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽'
                                        ) : null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-900">
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-800 transition-colors">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-3 py-2 text-sm text-white">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-3 py-4 text-center text-white">
                                Aucun membre trouvé
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="p-2 sm:p-4">
            <div className="text-white p-2 sm:p-4 shadow-md rounded-lg bg-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl sm:text-2xl font-medium text-secondary">Liste des Membres</h1>
                    <button
                        className="lg:hidden p-2 hover:bg-gray-700 rounded-lg"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        aria-label="Toggle menu"
                    >
                        <ChevronDown className={`w-6 h-6 transform transition-transform ${showMobileMenu ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <div className={`flex flex-col lg:flex-row lg:items-center gap-4 ${showMobileMenu ? 'block' : 'hidden lg:flex'}`}>
                    <input
                        type="text"
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Rechercher..."
                        className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        aria-label="Search members"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleDownload}
                            className="px-4 py-2 bg-gray-900 rounded-full hover:bg-gray-700 transition-colors flex items-center gap-2"
                            aria-label="Download data"
                        >
                            <Download className="w-5 h-5 text-white" />
                            <span className="hidden sm:inline text-white">Télécharger</span>
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5 text-white" />
                            <span className="hidden sm:inline text-white">Ajouter</span>
                        </button>
                    </div>
                </div>
            </div>

            {renderTableOrCards()}

            <AddMemberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddMember}
                member={editingMember}
            />
        </div>
    );
};

export default Membres;