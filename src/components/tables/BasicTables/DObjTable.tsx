import BriselleTable from "../../ui/table/BriselleTable";

const fieldMappings = {
    entity_id: "Entity ID",
    dobj_id: "DObj ID",
    dobj_name_system: "System Name",
    dobj_name_display: "Display Name",
    dobj_type: "Type",
    dobj_status: "Status",
    dobj_created_at: "Created At",
    dobj_updated_at: "Updated At",
};

export default function DObjTable() {
    return (
        <BriselleTable
            title="Data Object List"
            fetchUrl="http://localhost:5113/api/dobj/get-dobj-data"
            fieldMappings={fieldMappings}
            config={{
                enableSort: true,                 // ✅ Works
                enableHeader: true,              // ✅ Works
                enableRowSelection: true,        // Not sure what it does, ifs about ebility to copy the table rows, yes it works.
                enableRowHoverHighlight: true, // ✅ Works
                enableInlineEdit: ["dobj_name_display"], // ✅ Works
                enableRowNumber: true,           // ✅ Works
                enableStripedRows: true,         // ✅ Works
                enableRowActions: true,          // ✅ Works with placeholder icons
                enableMassSelection: true,       // ✅ Works with checkbox in first column
                enableTextWrap: true,            // Not able to test it
                enableColumnResize: true,       // ✅ Works
                enableColumnDivider: true,       // ✅ Works
                enableRowDivider: true,       // ✅ Works
                enableTheme: "theme1",                 // 🎨 Optional: Choose "theme1", "theme2", or "theme3"
            }}
        />
    );
}
