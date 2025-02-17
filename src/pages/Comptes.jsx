import React, { useState, useEffect, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table';
import {Pencil, Plus} from "lucide-react";

const Compte = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/membres.json')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const columns = useMemo(() => [
        { header: 'ID', accessorKey: 'id_membre' },
        { header: 'Nom et Prénom', accessorKey: 'nom_prenom_membre' },
        { header: 'Commune d\'origine', accessorKey: 'com_origin' },
        { header: 'Adresse', accessorKey: 'adresse_membre' },
        { header: 'Téléphone', accessorKey: 'tel_membre' },
        { header: 'Promotion', accessorKey: 'id_prom' },
        { header: 'Mention', accessorKey: 'id_mention' },
        { header: 'Parcours', accessorKey: 'id_parcours' },
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <div className="p-4">
            <div className="text-white flex items-center justify-between p-4 shadow-md">
                {/*Section Titres*/}
                <h1 className="text-2xl font-medium text-secondary mb-4">Liste des comptes</h1>

                {/*Section Bouton Tableau*/}
                <div className="flex items-center space-x-4">
                    {/*Bouton Importation*/}
                    <button
                        className="flex items-center justify-center md:justify-start w-full px-2 md:px-4 py-3 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors duration-200 group">
                        <Pencil className="w-5 h-5 text-white"/>
                        <span className="ml-3 font-regular text-white hidden md:block">
                            Importation
                        </span>
                    </button>

                    {/*Bouton Ajouter*/}
                    <button
                        className="flex items-center justify-center md:justify-start w-full px-2 md:px-4 py-3 bg-green-600 rounded-full hover:bg-green-500 transition-colors duration-200 group">
                        <Plus className="w-5 h-5 text-white"/>
                        <span className="ml-3 font-regular text-white hidden md:block">
                            Ajouter
                        </span>
                    </button>
                </div>
            </div>
            <table className="min-w-full bg-black text-white">
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(column => (
                            <th key={column.id} className="p-2 border-b border-gray-700">
                                {flexRender(column.column.columnDef.header, column.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="p-2 border-b border-gray-700">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination mt-4 flex items-center space-x-4">
                <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>{'<<'}</button>
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{'<'}</button>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{'>'}</button>
                <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}>{'>>'}</button>
                <span>Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}</span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => table.setPageSize(Number(e.target.value))}
                >
                    {[10, 20, 30, 40, 50].map(size => (
                        <option key={size} value={size}>Afficher {size}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Compte;