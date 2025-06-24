import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { supabase } from "../../../utils/supabase";

interface Entity {
  [key: string]: any;
}

const fieldMappings: { [key: string]: string } = {
  entity_id: "Entity Id",
  entity_name_display: "Entity Name Display",
  entity_configuration: "Entity Configuration",
  entity_description: "Entity Description",
  entity_created_at: "Entity Created At",
  entity_updated_at: "Entity Updated At",
};

export default function SupabaseEntityTable() {
  const [data, setData] = useState<Entity[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("entity").select("*");
      if (error) {
        setError(error.message);
        return;
      }

      if (data && data.length > 0) {
        const validColumns = Object.keys(fieldMappings).filter((key) => key in data[0]);
        setColumns(validColumns);
        setData(data);
      } else {
        setError("No matching fields found.");
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {fieldMappings[col] || col}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {row[col] ?? "-"}
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
