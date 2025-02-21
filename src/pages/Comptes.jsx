import React, { useState, useEffect, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import {
    Plus,
    Calendar,
    DollarSign,
    ClipboardList,
    User,
    ChevronDown,
    ArrowUpCircle,
    ArrowDownCircle, Download
} from "lucide-react";
//Import Modal Add Compte
import AddCompteModal from '../components/AddCompteModal.jsx';

const Comptes = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    // Etat Modal ouvert ou fermer
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Etat tri
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);

    useEffect(() => {
        fetch('/JSON/budget.json')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const columns = useMemo(() => [
        {
            header: 'ID',
            accessorKey: 'id_budget',
            enableSorting: true,
        },
        {
            header: 'Montant',
            accessorKey: 'montant',
            enableSorting: true,
            sortingFn: 'alphanumeric',
            cell: info => {
                const montant = info.getValue();
                return (
                    <span className={`flex items-center ${montant >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {montant.toLocaleString('fr-FR')} Ar
                    </span>
                );
            },
            filterFn: 'inNumberRange'
        },
        {
            header: 'Type',
            accessorKey: 'type_budget',
            enableSorting: true,
            cell: info => {
                const type = info.getValue();
                return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        type === 'Revenu' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {type === 'Revenu' ? <ArrowUpCircle className="w-4 h-4 mr-1" /> : <ArrowDownCircle className="w-4 h-4 mr-1" />}
                        {type}
                    </span>
                );
            },
            filterFn: 'equals'
        },
        {
            header: 'Date',
            accessorKey: 'date_budget',
            enableSorting: true,
            sortingFn: 'datetime',
            cell: info => new Date(info.getValue()).toLocaleDateString('fr-FR')
        },
        {
            header: 'Description',
            accessorKey: 'description_budget',
            enableSorting: true,
        },
        {
            header: 'ID Membre',
            accessorKey: 'id_membre',
            enableSorting: true,
        },
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
            columnFilters,
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
    });

    const handleAddBudget = async (newBudget) => {
        const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setData(prevData => [...prevData, { ...newBudget, id_budget: newId }]);
        setIsModalOpen(false);
    };

    // Composant pour la carte mobile
    const BudgetCard = ({ budget }) => (
        <div className="bg-gray-800 p-4 rounded-lg mb-4 shadow-md">
            <div className="flex items-center mb-3 justify-between">
                <div className="flex items-center">
                    <DollarSign className="w-6 h-6 mr-2 text-blue-400" />
                    <h3 className={`text-lg font-semibold ${budget.montant >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {budget.montant.toLocaleString('fr-FR')} Ar
                    </h3>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    budget.type_budget === 'Revenu' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {budget.type_budget === 'Revenu' ? <ArrowUpCircle className="w-4 h-4 mr-1" /> : <ArrowDownCircle className="w-4 h-4 mr-1" />}
                    {budget.type_budget}
                </span>
            </div>
            <div className="space-y-2">
                <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-300">
                        {new Date(budget.date_budget).toLocaleDateString('fr-FR')}
                    </span>
                </div>
                <div className="flex items-center">
                    <ClipboardList className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-300">{budget.description_budget}</span>
                </div>
                <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-300">Membre ID: {budget.id_membre}</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-2 sm:p-4">
            <div className="text-white p-2 sm:p-4 shadow-md rounded-lg bg-gray-800">
                {/* Header Section */}
                <div className="space-y-4">
                    {/* Title and Mobile Menu Button */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-medium text-secondary">Liste des Budgets</h1>
                        <button
                            className="lg:hidden p-2 hover:bg-gray-700 rounded-lg"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            <ChevronDown className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Controls Section */}
                    <div className={`flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4 
                        ${showMobileMenu ? 'block' : 'hidden lg:flex'}`}>
                        {/* Search Input */}
                        <div className="flex-grow">
                            <input
                                type="text"
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                                placeholder="Rechercher..."
                                className="w-full px-4 py-2 bg-gray-900 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <button
                                className="flex items-center justify-center px-4 py-2 bg-gray-900 rounded-full hover:bg-gray-700 transition-colors duration-200">
                                <Download className="w-5 h-5 text-white"/>
                                <span className="ml-2 font-regular text-white">Importer</span>
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center justify-center px-4 py-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors duration-200">
                                <Plus className="w-5 h-5 text-white"/>
                                <span className="ml-2 font-regular text-white">Ajouter</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive Content Section */}
            <div className="mt-4">
                {/* Mobile Cards View */}
                <div className="lg:hidden">
                    {table.getRowModel().rows.map((row) => (
                        <BudgetCard
                            key={row.original.id_budget}
                            budget={row.original}
                        />
                    ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden border border-gray-700 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-700">
                                <thead className="bg-gray-800">
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                            >
                                                <div className="flex flex-col gap-2">
                                                    {/* En-tête de colonne avec tri */}
                                                    <div
                                                        className={`flex items-center gap-2 cursor-pointer ${
                                                            header.column.getCanSort() ? 'hover:text-blue-400' : ''
                                                        }`}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {{
                                                            asc: ' 🔼',
                                                            desc: ' 🔽',
                                                        }[header.column.getIsSorted()] ?? null}
                                                    </div>

                                                    {/* Filtres spécifiques pour chaque colonne */}
                                                    {header.column.getCanFilter() && (
                                                        <div>
                                                            {/* Filtre pour le type de budget */}
                                                            {header.column.id === 'type_budget' ? (
                                                                    <select
                                                                        value={header.column.getFilterValue() ?? ''}
                                                                        onChange={e => header.column.setFilterValue(e.target.value)}
                                                                        className="w-full px-2 py-1 text-xs bg-gray-700 rounded border border-gray-600 text-white"
                                                                    >
                                                                        <option value="">Tous</option>
                                                                        <option value="Revenu">Revenu</option>
                                                                        <option value="Dépense">Dépense</option>
                                                                    </select>
                                                                ) :
                                                                /* Filtre pour la date */
                                                                // header.column.id === 'date_budget' ? (
                                                                //         <div className="flex gap-1">
                                                                //             <input
                                                                //                 type="date"
                                                                //                 value={header.column.getFilterValue()?.[0] ?? ''}
                                                                //                 onChange={e => header.column.setFilterValue(prev => [
                                                                //                     e.target.value,
                                                                //                     prev?.[1]
                                                                //                 ])}
                                                                //                 className="w-full px-2 py-1 text-xs bg-gray-700 rounded border border-gray-600 text-white"
                                                                //             />
                                                                //             <input
                                                                //                 type="date"
                                                                //                 value={header.column.getFilterValue()?.[1] ?? ''}
                                                                //                 onChange={e => header.column.setFilterValue(prev => [
                                                                //                     prev?.[0],
                                                                //                     e.target.value
                                                                //                 ])}
                                                                //                 className="w-full px-2 py-1 text-xs bg-gray-700 rounded border border-gray-600 text-white"
                                                                //             />
                                                                //         </div>
                                                                //     ) :
                                                                    /* Filtre par défaut pour les autres colonnes */
                                                                    (
                                                                        <input
                                                                            type={header.column.id === 'montant' ? 'number' : 'text'}
                                                                            value={header.column.getFilterValue() ?? ''}
                                                                            onChange={e => header.column.setFilterValue(e.target.value)}
                                                                            placeholder={`Filtrer...`}
                                                                            className="w-full px-2 py-1 text-xs bg-gray-700 rounded border border-gray-600 text-white placeholder-gray-400"
                                                                        />
                                                                    )
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                                </thead>
                                <tbody className="divide-y divide-gray-700 bg-black">
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="hover:bg-gray-900">
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="px-3 py-2 text-sm text-white">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination Section */}
            <div className="mt-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                {/* Navigation Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {'<<'}
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {'<'}
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {'>'}
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-200 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {'>>'}
                    </button>
                </div>

                {/* Page Size and Info */}
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                    <span className="text-sm text-white">
                        Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
                    </span>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-white">Lignes par page:</span>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => table.setPageSize(Number(e.target.value))}
                            className="bg-gray-900 text-white rounded-md px-2 py-1 text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {[10, 20, 30, 40, 50].map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <AddCompteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddBudget}
            />
        </div>
    );
};

export default Comptes;