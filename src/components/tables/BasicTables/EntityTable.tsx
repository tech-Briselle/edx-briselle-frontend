import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";
import axios from "axios";

interface Entity {
    [key: string]: unknown;
}

// Define snake_case (DB) → camelCase (JS) mapping
const fieldMappings: { [key: string]: string } = {
    entity_id: "Entity Id",
   // entity_name_system: "Entity Name System",
    entity_name_display: "Entity Name Display",
   // entity_status: "Entity Status",
    entity_configuration: "Entity Configuration",
    entity_description: "Entity Description",
    entity_created_at: "Entity Created At",
    entity_updated_at: "Entity Updated At",
    //entity_created_by_id: "Entity Created By Id",
    //entity_modified_by_id: "Entity Modified By Id",
};

// Function to convert snake_case keys to camelCase
const convertKeys = (object: Record<string, unknown>): Record<string, unknown> => {
    const newObj: Record<string, unknown> = {};
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            newObj[key] = object[key]; // Keep values same
        }
    }
    return newObj;
};

export default function EntityTable() {
    const [data, setData] = useState<Entity[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get("http://localhost:5113/api/entity/get-entity-data")
            .then(response => {
                console.log("API Response:", response.data); // Debugging
                if (response.data.length > 0) {
                    const firstRow = response.data[0];
                    console.log("First Row Keys:", Object.keys(firstRow)); // Debugging

                    // Validate only fields that exist in response
                    const validColumns = Object.keys(fieldMappings).filter(key => key in firstRow);

                    if (validColumns.length === 0) {
                        setError("No matching fields found in API response.");
                    } else {
                        setColumns(validColumns);
                        setData(response.data.map(convertKeys)); // Convert API data keys
                    }
                } else {
                    setError("API returned empty data.");
                }
            })
            .catch(error => {
                console.error("Error fetching entity data:", error);
                setError("Failed to load data.");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center p-4">Loading...</p>;
    if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    {/* Table Header */}
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            {columns.map((col, index) => (
                                <TableCell
                                    key={index}
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    {fieldMappings[col] || col} {/* Show display name */}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex} className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {row[col]?.toString() || "-"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
