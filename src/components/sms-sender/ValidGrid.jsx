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
import { ChangeCircle, Close, Delete, Search } from "@mui/icons-material";
import TSelector from "../input-selector/Selector";
import { useSMS } from "./SMSHook";
import { images } from "../../assets/images/images";
import { replaceSpaceWithUnderscore } from "../../constants/reusable-functions";

const ValidGrid = React.memo(
  ({ tableData, colDef }) => {
    const {
      setExcelDataState,
      changeEntryMethode,
      gridApi,
      setGridApi,
      executeLocalSearch,
    } = useSMS();
    const rowGroupPanelShow = "always";
    const [searchFilter, setSearhFilter] = useState();
    const autoGroupColumnDef = useMemo(() => {
      return {
        headerName: "Workbook",
        field: "Workbook",
        minWidth: 250,
        cellRenderer: "agGroupCellRenderer",
        cellRendererParams: {
          checkbox: true,
        },
        headerCheckboxSelection: true,
        headerCheckboxSelectionCurrentPageOnly: true,
      };
    }, []);

    const [rowData, setRowData] = useState([]);
    const [columns, setColumns] = useState({ gridColumns: [], columnsArr: [] });

    const isGroupOpenByDefault = useCallback((params) => {
      return params.key === "Australia" || params.key === "Rowing";
    }, []);

    useEffect(() => {
      setRowData(tableData);
      console.log(tableData);
      const keys = tableData.length ? Object?.keys(tableData[0]) : [];
      if (keys[keys.length - 1] === "undefined") keys.pop();
      tableData.length &&
        setColumns({
          gridColumns: dynamicallyConfigureColumnsFromObject(tableData[0]),
          columnsArr: keys.map((item) => replaceSpaceWithUnderscore(item)),
        });
    }, [tableData]);

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
    const defaultColDef = useMemo(() => {
      return {
        flex: 1,
        minWidth: 100,
        resizable: true,
      };
    }, []);

    const dynamicallyConfigureColumnsFromObject = (anObject) => {
      const colDefs = [];
      const keys = Object.keys(anObject);
      keys.map((key) => {
        if (key === "Workbook") {
          return colDefs.push({
            field: key,
            sortable: true,
            rowGroup: true,
            hide: true,
            enableRowGroup: true,
          });
        }
        if (key === "undefined") {
          return;
        }
        return colDefs.push({ field: key, sortable: true });
      });
      return colDefs;
    };

    const ejectSearchFilters = () => {
      return columns.columnsArr?.map((item, index) => {
        return <option key={index}>{item}</option>;
      });
    };

    const ejectSorters = () => {
      return columns.columnsArr?.map((item, index) => {
        return <option key={index}>{item}</option>;
      });
    };

    const executeSort = (value) => {
      const sort = [
        {
          colId: value,
          sort: "asc",
        },
      ];

      //   gridRef.current.api?.setSortModel(sort);
      //   gridRef.current.api.setQuickFilter(value);
    };

    const onSelectionChanged = useCallback((event) => {
      const rowsSelectec = event.api.getSelectedRows();
      //   setRecipientList(rowsSelectec);
      //   window.alert("selection changed, " + rowCount + " rows selected");
    }, []);

    return (
      <div className="w-full h-full flex flex-col overflow-hidden relative">
        <div className="w-full h-[40px] pointer-events-none flex justify-end  absolute right-0 top-[0px] z-[2]">
          <div className="px-2 py-2 whitespace-nowrap w-[40%] justify-end h-full flex items-center min-w-[150px]  pointer-events-none  ">
            <div
              onClick={(e) => {
                // resetExcelEntry();
              }}
              className="flex px-2 cursor-pointer  text-bgTrade mr-2 pointer-events-auto mt-1 hover:bg-gray-100 rounded-full"
            >
              <button
                className={` h-[34px]  text-bgTrade text-xs text-red-700  flex justify-center   items-center  cursor-pointer  rounded-full whitespace-nowrap transition-all`}
              >
                Change file{" "}
                {/* <img className="h-[20px] min-w-[20px]" src={images.excelFile} /> */}
                <ChangeCircle className="text-red-700 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine w-full h-full">
          <AgGridReact
            autoGroupColumnDef={autoGroupColumnDef}
            // ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columns.gridColumns} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
            // onCellClicked={()=>cellClickedListener()} // Optional - registering for Grid Event
            className="w-full h-[]"
            rowMultiSelectWithClick={true}
            groupSelectsChildren={true}
            onSelectionChanged={onSelectionChanged}
            // isGroupOpenByDefault={isGroupOpenByDefault}
            // paginationAutoPageSize={true}
            paginateChildRows={true}
            checkboxSelection={true}
            // sideBar={sideBar}
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

export default ValidGrid;

// // Example using Grid's API
// const buttonListener = useCallback((e) => {
//   gridRef.current.api.deselectAll();
// }, []);
