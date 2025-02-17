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
    Pencil,
    Plus,
    Calendar,
    Clock,
    ShoppingCart,
    DollarSign,
    Package,
    ChevronDown,
    Receipt
} from "lucide-react";

const Depense = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        fetch('/depense.json')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const columns = useMemo(() => [
        { header: 'ID', accessorKey: 'id_depense' },
        { header: 'Titre', accessorKey: 'titre_depense' },
        {
            header: 'Quantité',
            accessorKey: 'qte_depense',
            cell: info => (
                <span className="font-medium">
                    {info.getValue().toLocaleString('fr-FR')} unité(s)
                </span>
            )
        },
        {
            header: 'Prix Unitaire',
            accessorKey: 'prix_unitaire_depense',
            cell: info => (
                <span className="text-amber-500">
                    {info.getValue().toLocaleString('fr-FR')} Ar
                </span>
            )
        },
        {
            header: 'Montant Total',
            cell: info => {
                const qte = info.row.original.qte_depense;
                const prix = info.row.original.prix_unitaire_depense;
                const total = qte * prix;
                return (
                    <span className="font-bold text-red-500">
                        {total.toLocaleString('fr-FR')} Ar
                    </span>
                );
            }
        },
        {
            header: 'Date',
            accessorKey: 'date_depense',
            cell: info => new Date(info.getValue()).toLocaleDateString('fr-FR')
        },
        {
            header: 'Heure',
            accessorKey: 'heure_depense'
        },
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
    });

    // Composant pour la carte mobile
    const DepenseCard = ({ depense }) => {
        const montantTotal = depense.qte_depense * depense.prix_unitaire_depense;

        return (
            <div className="bg-gray-800 p-4 rounded-lg mb-4 shadow-md">
                <div className="flex items-center mb-3">
                    <ShoppingCart className="w-6 h-6 mr-2 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">
                        {depense.titre_depense}
                    </h3>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <Package className="w-5 h-5 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-300">
                            Quantité: {depense.qte_depense.toLocaleString('fr-FR')} unité(s)
                        </span>
                    </div>
                    <div className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
                        <span className="text-sm text-amber-500">
                            Prix unitaire: {depense.prix_unitaire_depense.toLocaleString('fr-FR')} Ar
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Receipt className="w-5 h-5 mr-2 text-gray-400" />
                        <span className="text-sm font-bold text-red-500">
                            Total: {montantTotal.toLocaleString('fr-FR')} Ar
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-300">
                            {new Date(depense.date_depense).toLocaleDateString('fr-FR')}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-300">{depense.heure_depense}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-2 sm:p-4">
            <div className="text-white p-2 sm:p-4 shadow-md rounded-lg bg-gray-800">
                {/* Header Section */}
                <div className="space-y-4">
                    {/* Title and Mobile Menu Button */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-medium text-secondary">Liste des Dépenses</h1>
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
                            <button className="flex items-center justify-center px-4 py-2 bg-gray-900 rounded-full hover:bg-gray-700 transition-colors duration-200">
                                <Pencil className="w-5 h-5 text-white"/>
                                <span className="ml-2 font-regular text-white">Modifier</span>
                            </button>
                            <button className="flex items-center justify-center px-4 py-2 bg-green-600 rounded-full hover:bg-green-500 transition-colors duration-200">
                                <Plus className="w-5 h-5 text-white"/>
                                <span className="ml-2 font-regular text-white">Nouvelle Dépense</span>
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
                        <DepenseCard
                            key={row.original.id_depense}
                            depense={row.original}
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
                                        {headerGroup.headers.map(column => (
                                            <th
                                                key={column.id}
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                            >
                                                {flexRender(column.column.columnDef.header, column.getContext())}
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
        </div>
    );
};

export default Depense;