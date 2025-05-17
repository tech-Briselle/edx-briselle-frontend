import { useEffect, useState, useRef } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "./table";
import { Button } from "../button/Button";
import axios from "axios";
import { ExternalLink, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router";
import DObjTable from "../../tables/BasicTables/DObjTable";
//import './index';


interface DObj {
    [key: string]: string | number | null;
}

interface Config {
    enableSort?: boolean;
    enableHeader?: boolean;
    enableRowSelection?: boolean;
    enableRowHoverHighlight?: boolean;
    enableInlineEdit?: string[];
    enableRowNumber?: boolean;
    enableStripedRows?: boolean;
    enableRowActions?: boolean;
    enableMassSelection?: boolean;
    enableTextWrap?: boolean;
    enableColumnResize?: boolean;
    enableColumnDivider?: boolean;
    enableRowDivider?: boolean;
    enableTheme?: 'theme1' | 'theme2' | 'theme3';
}

interface Props {
    title?: string;
    fetchUrl: string;
    fieldMappings: Record<string, string>;
    config: Config;
}

export default function BriselleTable({ title, fetchUrl, fieldMappings, config }: Props) {
    const [data, setData] = useState<DObj[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [editCell, setEditCell] = useState<{ row: number; column: string } | null>(null);
    const [editValue, setEditValue] = useState<string>("");
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    const resizeRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        axios.get(fetchUrl)
            .then((response) => {
                if (response.data.length > 0) {
                    const keys = Object.keys(response.data[0]);
                    const validCols = keys.filter((k) => Object.keys(fieldMappings).includes(k));
                    setColumns(validCols);
                    setData(response.data);
                } else {
                    setError("No data received");
                }
            })
            .catch(() => setError("Error fetching data"))
            .finally(() => setLoading(false));
    }, [fetchUrl, fieldMappings]);

    const handleSort = (column: string) => {
        if (!config.enableSort) return;
        const newOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(newOrder);

        const sorted = [...data].sort((a, b) => {
            const valA = a[column] ?? "";
            const valB = b[column] ?? "";
            if (typeof valA === 'number' && typeof valB === 'number') {
                return newOrder === 'asc' ? valA - valB : valB - valA;
            }
            return newOrder === 'asc'
                ? String(valA).localeCompare(String(valB))
                : String(valB).localeCompare(String(valA));
        });

        setData(sorted);
    };

    const toggleRowSelection = (index: number) => {
        const updated = new Set(selectedRows);
        if (updated.has(index)) {
            updated.delete(index);
        } else {
            updated.add(index);
        }
        setSelectedRows(updated);
    };

    const handleEditStart = (rowIdx: number, column: string, initialValue: string) => {
        setEditCell({ row: rowIdx, column });
        setEditValue(initialValue);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    };

    const handleEditSubmit = () => {
        if (!editCell) return;
        const updatedData = [...data];
        updatedData[editCell.row][editCell.column] = editValue;
        setData(updatedData);
        setEditCell(null);
    };

    const getThemeClasses = () => {
        switch (config.enableTheme) {
            //case 'theme1':
            //    return 'text-theme-sm text-gray-500 dark:text-gray-400';
            case 'theme1':
                return 'text-theme-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800';
            case 'theme2':
                return 'bg-blue-50 text-blue-700';
            case 'theme3':
                return 'bg-green-50 text-green-800';
            default:
                return '';
        }
    };

    const handleMouseDown = (e: React.MouseEvent, col: string) => {
        if (!config.enableColumnResize) return;

        const startX = e.clientX;
        const startWidth = columnWidths[col] || resizeRefs.current[col]?.offsetWidth || 150;

        const handleMouseMove = (e: MouseEvent) => {
            const newWidth = startWidth + (e.clientX - startX);
            setColumnWidths((prev) => ({ ...prev, [col]: newWidth }));
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="p-4">
            {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <Table>
                        {config.enableHeader && (
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    {config.enableMassSelection && (
                                        <TableCell className="px-5 py-3 font-medium text-start">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.size === data.length}
                                                onChange={(e) => {
                                                    const newSet = e.target.checked
                                                        ? new Set(data.map((_, i) => i))
                                                        : new Set();
                                                    setSelectedRows(newSet);
                                                }}
                                            />
                                        </TableCell>
                                    )}
                                    {config.enableRowNumber && <TableCell className="px-5 py-3 font-medium text-start">#</TableCell>}
                                    {columns.map((col) => (
                                        <TableCell
                                            key={col}
                                            ref={(el) => (resizeRefs.current[col] = el)}
                                            onClick={() => handleSort(col)}
                                            style={{ width: columnWidths[col] || 'auto' }}
                                            className={`relative cursor-pointer px-5 py-3 font-medium text-start ${getThemeClasses()} ${config.enableColumnDivider ? 'border-r border-gray-200' : ''}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span>{fieldMappings[col]}</span>
                                                {config.enableSort && sortColumn === col && (
                                                    <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                                                )}
                                            </div>
                                            {config.enableColumnResize && (
                                                <div
                                                    onMouseDown={(e) => handleMouseDown(e, col)}
                                                    className="absolute top-0 right-0 w-2 h-full cursor-col-resize z-10"
                                                />
                                            )}
                                        </TableCell>
                                    ))}
                                    {config.enableRowActions && <TableCell className="px-5 py-3 font-medium text-start">Actions</TableCell>}
                                </TableRow>
                            </TableHeader>
                        )}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {/*{data.map((row, rowIndex) => (*/}
                               
                            {/*    <TableRow*/}
                            {/*        key={rowIndex}*/}
                            {/*        className={`transition-colors duration-150 ${config.enableRowHoverHighlight ? 'hover:bg-blue-100 transition duration-200' : ''*/}
                            {/*            } ${config.enableStripedRows && rowIndex % 2 === 1 ? 'bg-gray-50 dark:bg-white/[0.02]' : ''*/}
                            {/*            } ${config.enableRowDivider ? 'border-b border-gray-200 dark:border-white/[0.05]' : ''}`}*/}
                            {/*    >*/}

                            {/*        {config.enableMassSelection && (*/}
                            {/*            <TableCell className="px-5 py-4 text-start">*/}
                            {/*                <input*/}
                            {/*                    type="checkbox"*/}
                            {/*                    checked={selectedRows.has(rowIndex)}*/}
                            {/*                    onChange={() => toggleRowSelection(rowIndex)}*/}
                            {/*                />*/}
                            {/*            </TableCell>*/}
                            {/*        )}*/}
                            {/*        {config.enableRowNumber && <TableCell className="px-5 py-4 text-start">{rowIndex + 1}</TableCell>}*/}
                            {/*        {columns.map((col) => (*/}
                            {/*            <TableCell*/}
                            {/*                key={col}*/}
                            {/*                style={{ width: columnWidths[col] || 'auto' }}*/}
                            {/*                className={`px-4 py-3 text-start ${config.enableTextWrap ? 'whitespace-normal' : 'truncate'} ${getThemeClasses()} ${config.enableColumnDivider ? 'border-r border-gray-200' : ''}`}*/}
                            {/*            >*/}
                            {/*                {editCell?.row === rowIndex && editCell?.column === col ? (*/}
                            {/*                    <input*/}
                            {/*                        type="text"*/}
                            {/*                        value={editValue}*/}
                            {/*                        onChange={handleEditChange}*/}
                            {/*                        onBlur={handleEditSubmit}*/}
                            {/*                        autoFocus*/}
                            {/*                        className="w-full px-2 py-1 border rounded"*/}
                            {/*                    />*/}
                            {/*                ) : (*/}
                            {/*                    <div*/}
                            {/*                        onDoubleClick={() => {*/}
                            {/*                            if (config.enableInlineEdit?.includes(col)) {*/}
                            {/*                                handleEditStart(rowIndex, col, String(row[col] ?? ''));*/}
                            {/*                            }*/}
                            {/*                        }}*/}
                            {/*                    >*/}
                            {/*                        {row[col]?.toString() || "-"}*/}
                            {/*                    </div>*/}
                            {/*                )}xxx   */}
                            {/*            </TableCell>*/}
                            {/*        ))}*/}
                            {/*        {config.enableRowActions && (*/}
                            {/*            <TableCell className="px-4 py-3 flex gap-2">*/}
                            {/*                */}{/*<Button variant="ghost" size="sm">✏️</Button>*/}
                            {/*                */}{/*<Button variant="ghost" size="sm" className="text-red-500">🗑️</Button>*/}
                            {/*                <Link*/}
                            {/*                    to={`/users/${DObjTable.id}`}*/}
                            {/*                    className="p-1 text-gray-500 hover:text-primary transition-colors"*/}
                            {/*                    title="View details"*/}
                            {/*                >*/}
                            {/*                    <ExternalLink size={16} />*/}
                            {/*                </Link>*/}
                            {/*                <button*/}
                            {/*                    className="p-1 text-gray-500 hover:text-primary transition-colors"*/}
                            {/*                    title="Edit user"*/}
                            {/*                >*/}
                            {/*                    <Edit size={16} />*/}
                            {/*                </button>*/}
                            {/*                <button*/}
                            {/*                    className="p-1 text-gray-500 hover:text-error transition-colors"*/}
                            {/*                    title="Delete user"*/}
                            {/*                >*/}
                            {/*                    <Trash2 size={16} />*/}
                            {/*                </button>*/}
                            {/*            </TableCell>*/}
                            {/*        )}*/}
                            {/*    </TableRow>*/}
                            {/*))}*/}


                            {data.map((row, rowIndex) => (
                                <TableRow
                                    key={rowIndex}
                                    onClick={() => {
                                        const newSet = new Set(selectedRows);
                                        if (selectedRows.has(rowIndex)) {
                                            newSet.delete(rowIndex);
                                        } else {
                                            newSet.add(rowIndex);
                                        }
                                        setSelectedRows(newSet);
                                    }}
                                    className={`cursor-pointer transition-colors duration-150 ${config.enableRowHoverHighlight ? 'hover:bg-blue-100 transition duration-200' : ''
                                        } ${config.enableStripedRows && rowIndex % 2 === 1 ? 'bg-gray-50 dark:bg-white/[0.02]' : ''
                                        } ${config.enableRowDivider ? 'border-b border-gray-200 dark:border-white/[0.05]' : ''
                                        }`}
                                >
                                    {config.enableMassSelection && (
                                        <TableCell className="px-5 py-4 text-start" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.has(rowIndex)}
                                                onChange={() => toggleRowSelection(rowIndex)}
                                            />
                                        </TableCell>
                                    )}

                                    {config.enableRowNumber && (
                                        <TableCell className="px-5 py-4 text-start">{rowIndex + 1}</TableCell>
                                    )}

                                    {columns.map((col) => (
                                        <TableCell
                                            key={col}
                                            style={{ width: columnWidths[col] || 'auto' }}
                                            className={`px-4 py-3 text-start ${config.enableTextWrap ? 'whitespace-normal' : 'truncate'
                                                } ${config.enableColumnDivider ? 'border-r border-gray-200' : ''}`}
                                        >
                                            {editCell?.row === rowIndex && editCell?.column === col ? (
                                                <input
                                                    type="text"
                                                    value={editValue}
                                                    onChange={handleEditChange}
                                                    onBlur={handleEditSubmit}
                                                    autoFocus
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            ) : (
                                                <div
                                                    onDoubleClick={(e) => {
                                                        e.stopPropagation();
                                                        if (config.enableInlineEdit?.includes(col)) {
                                                            handleEditStart(rowIndex, col, String(row[col] ?? ''));
                                                        }
                                                    }}
                                                >
                                                    {row[col]?.toString() || '-'}
                                                </div>
                                            )}
                                        </TableCell>
                                    ))}

                                    {config.enableRowActions && (
                                        <TableCell className="px-4 py-3 flex gap-2">
                                            <Link
                                                to={`/users/${row.id}`}
                                                className="p-1 text-gray-500 hover:text-success transition-colors"
                                                title="View"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink size={16} className="stroke-current" />
                                            </Link>
                                            <button
                                                className="p-1 text-gray-500 hover:text-primary transition-colors"
                                                title="Edit"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Edit size={16} className="stroke-current" />
                                            </button>
                                            <button
                                                className="p-1 text-gray-500 hover:text-delete transition-colors"
                                                title="Delete"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Trash2 size={16} className="stroke-current" />
                                            </button>
                                        </TableCell>

                                    )}
                                </TableRow>
                            ))}


                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="bg-customBlue text-white p-4">
                Tailwind works!
            </div>
            <div className="bg-success text-white p-4">
                If this is blue, Tailwind is working
            </div>
        </div>
        
    );
}
