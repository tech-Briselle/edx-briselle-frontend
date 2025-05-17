import React from "react";

export const Table = ({ children }: { children: React.ReactNode }) => (
    <table className="min-w-full text-left text-sm">{children}</table>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
    <tbody>{children}</tbody>
);

//export const TableRow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//    <tr className={className}>{children}</tr>
//);
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children: React.ReactNode;
}

export function TableRow({ children, className, ...rest }: TableRowProps) {
    return <tr className={className} {...rest}>{children}</tr>;
}

export const TableCell = ({
    children,
    isHeader = false,
    className = "",
    ...props
}: {
    children: React.ReactNode;
    isHeader?: boolean;
    className?: string;
    [key: string]: any;
}) => {
    const CellTag = isHeader ? "th" : "td";
    return (
        <CellTag className={`px-4 py-2 ${className}`} {...props}>
            {children}
        </CellTag>
    );
};
