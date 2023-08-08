import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-enterprise";

const AppGrid = React.memo(
  ({ tableData, colDef }) => {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    // console.log(tableData);
    const [columnDefs, setColumnDefs] = useState([
      { field: "make", filter: true },
      { field: "model", filter: true },
      { field: "price" },
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => {
      return {
        resizable: true,
        filter: true,
      };
    }, []);

    const autoGroupColumnDef = useMemo(() => {
      return {
        minWidth: 300,
      };
    }, []);

    // Example load data from server
    useEffect(() => {
      setRowData(tableData);
    }, [tableData]);

    // Example using Grid's API
    const buttonListener = useCallback((e) => {
      gridRef.current.api.deselectAll();
    }, []);

    const sideBar = {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          minWidth: 225,
          maxWidth: 225,
          width: 225,
        },
        {
          id: "filters",
          labelDefault: "Filters",
          labelKey: "filters",
          iconKey: "filter",
          toolPanel: "agFiltersToolPanel",
          minWidth: 180,
          maxWidth: 400,
          width: 250,
        },
      ],
      position: "right",
    };

    const rowGroupPanelShow = "always";

    console.log("reloaded");
    return (
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine w-full h-full">
          <AgGridReact
            autoGroupColumnDef={autoGroupColumnDef}
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={colDef || columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
            // onCellClicked={()=>cellClickedListener()} // Optional - registering for Grid Event
            className="w-full h-full"
            sideBar={sideBar}
            rememberGroupStateWhenNewData={true}
            suppressScrollOnNewData={true}
            rowGroupPanelShow={rowGroupPanelShow}
            pagination={true}
          />
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (
      JSON.stringify(prevProps.tableData) ===
      JSON.stringify(nextProps.tableData)
    ) {
      return true; // props are equal
    }
    return false; // props are not equal -> update the component
  }
);

export default AppGrid;
