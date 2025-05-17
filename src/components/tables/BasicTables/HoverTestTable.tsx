import React from "react";

export default function HoverTestTable() {
    const rows = [
        { id: 1, name: "Apple", type: "Fruit" },
        { id: 2, name: "Carrot", type: "Vegetable" },
        { id: 3, name: "Banana", type: "Fruit" },
        { id: 4, name: "Potato", type: "Vegetable" },
        { id: 5, name: "Mango", type: "Fruit" },
    ];

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Hover Row Test Table</h2>
            <table className="min-w-full text-sm border border-gray-200 rounded overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left border-b">ID</th>
                        <th className="px-4 py-2 text-left border-b">Name</th>
                        <th className="px-4 py-2 text-left border-b">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr
                            key={row.id}
                            className="hover:bg-orange-100 bg-red-100"
                        >
                            <td className="px-4 py-2 border-b">{row.id}</td>
                            <td className="px-4 py-2 border-b">{row.name}</td>
                            <td className="px-4 py-2 border-b">{row.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
