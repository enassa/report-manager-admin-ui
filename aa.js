{
  /* <DynamicTable
          tableData={[...dummyStudents]}
          customComponents={[
            {
              columnName: "symbol",
              component: (cellData) => {
                return (
                  <div className="flex justify-start items-center">
                    <div className="flex h-full">
                      <img
                        alt="symbol-logo"
                        className="h-[20px] mr-[10px]"
                        src={"getImageFromSymbol(cellData)"}
                      />
                    </div>
                    <span>{cellData}</span>
                  </div>
                );
              },
            },
            {
              columnName: "day_range",
              component: (cellData) => {
                return (
                  <div className="flex justify-start items-center">
                    <span>{cellData[0]}</span>
                    <SyncAlt className="text-blue-500 px-0 mx-2" />
                    <div className="flex justify-center items-center flex-col">
                      {cellData[1]}
                    </div>
                  </div>
                );
              },
            },
            {
              columnName: "split_values",
              component: (cellData) => {
                return (
                  <div className="flex justify-start items-center">
                    {cellData.map((item, index) => {
                      return (
                        <div>
                          <span>{item}</span>
                          {index + 1 !== cellData.length && (
                            <span className="font-extrabold text-blue-500 px-0 mx-2">
                              |
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              },
            },
            {
              columnName: "date",
              component: (cellData) => {
                return <div className="">{cellData}</div>;
              },
            },
            {
              columnName: "price",
              component: (cellData) => {
                return <div className="">${cellData}</div>;
              },
            },
            {
              columnName: "total",
              component: (cellData) => {
                return <div className="">$ {cellData}</div>;
              },
            },
            {
              columnName: "splited",
              component: (cellData) => {
                return (
                  <div className="flex capitalize ">
                    {cellData === true ? (
                      <div className="flex w-[80px] h-[30px] pl-[10px] rounded-sm justify-start items-center  bg-green-50 text-green-700">
                        true
                      </div>
                    ) : (
                      <div className="flex w-[80px] h-[30px] pl-[10px]  rounded-sm  justify-start items-center  bg-red-50 text-red-500">
                        false
                      </div>
                    )}
                  </div>
                );
              },
            },
            {
              columnName: "status",
              component: (cellData) => {
                return (
                  <div className="flex capitalize ">
                    {cellData === "failed" ? (
                      <div className="flex w-[80px] h-[30px] pl-[10px]  rounded-sm  justify-start items-center  bg-red-50 text-red-500">
                        {cellData}
                      </div>
                    ) : cellData === "pending" ? (
                      <div className="flex w-[80px] h-[30px] pl-[10px] rounded-sm justify-start items-center  bg-yellow-50 text-yellow-700">
                        {cellData}
                      </div>
                    ) : (
                      <div className="flex w-[80px] h-[30px] pl-[10px] rounded-sm justify-start items-center  bg-green-50 text-green-700">
                        {cellData}
                      </div>
                    )}
                  </div>
                );
              },
            },
          ]}
          insertColumnsAfter={[
            {
              columnName: "Current_Year",
              columns: [
                {
                  header: "Actions",
                  headerComponent: () => {
                    return <div className="flex justify-start"> Actions </div>;
                  },
                  component: (cellData, rowData) => {
                    return (
                      <div className="flex ">
                        <Tooltip
                          title={`${
                            rowData.status !== "failed" ? "" : "Retry order"
                          }`}
                        >
                          <Refresh
                            className={`mr-3 cursor-pointer  ${
                              rowData.status !== "failed"
                                ? "text-gray-300"
                                : "text-blue-700"
                            }`}
                          />
                        </Tooltip>
                        <Tooltip
                          title={`${
                            rowData.status === "failed" ? "" : "Cancel order "
                          }`}
                        >
                          <Close
                            className={`mr-3 cursor-pointer ${
                              rowData.status === "canceled" ||
                              (rowData.status === "failed"
                                ? "text-gray-300"
                                : "text-red-500 ")
                            }`}
                          />
                        </Tooltip>
                        <Tooltip
                          title={`${
                            rowData.status !== "pending" ? "" : "Delete order"
                          }`}
                        >
                          <DeleteOutline
                            className={`mr-3 cursor-pointer  ${
                              rowData.status === "pending"
                                ? "text-gray-300"
                                : "text-red-900"
                            }`}
                          />
                        </Tooltip>
                      </div>
                    );
                  },
                },
              ],
            },
          ]}
          rowStyles={{
            styles: { color: "" },
            classNames:
              "hover:bg-gray-50 text-gray-400 mb-[20px] h-[20px] text-sm",
          }}
          cellStyles={[
            {
              column: "*",
              classNames: "text-left lowercase",
            },
          ]}
          headerStyles={[
            {
              column: "*",
              styles: { color: "" },
              classNames: "text-md text-justify text-[#364E62] font-light ",
            },
          ]}
          renameTheseHeaders={[
            {
              renameThis: "currency",
              withThis: "Crncy",
            },
            {
              renameThis: "split_values",
              withThis: "split amounts",
            },
            {
              renameThis: "quantity",
              withThis: "Qty",
            },
          ]}
          defaultFIlterIndex={1}
          rowsToDisplayOptions={["10", "50", "100", "200"]}
        /> */
}
