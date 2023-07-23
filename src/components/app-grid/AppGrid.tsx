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

const AppGrid = ({ tableData, colDef }) => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  console.log(tableData);
  const [columnDefs, setColumnDefs] = useState([
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price" },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
    };
  }, []);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    // console.log("cellClicked", event);
  }, []);

  // Example load data from server
  useEffect(() => {
    setRowData(tableData);
  }, [tableData]);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div className="w-full h-full flex bg-red-400">
      {/* Example using Grid's API */}

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={colDef || columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default AppGrid;
