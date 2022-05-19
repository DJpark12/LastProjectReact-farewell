import React from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { useThemeSwitcher } from "mui-theme-switcher";

const CostStatementGrid = () => {
  const data = useSelector(({ AccReducer }) => AccReducer.StatementReducer.CostList, []);
  //const { error } = useSelector(state => state.AccReducer);
  const { isLoading } = useSelector(state => state.AccReducer.StatementReducer);

  const CostStatementGrid = [
    {
      headerName: "과목",
      field: "accountName",
      colId: "과목명",
      cellStyle: {
        textAlign: "left",
        //borderLeft: "0.1mm ridge #c2c2c2",
        borderRight: "0.1mm ridge #c2c2c2",
      },
      width: 150,
    },
    {
      headerName: "당기",
      headerClass: "participant-group",
      marryChildren: true,
      children: [
        {
          headerName: "세부금액",
          field: "cost",
          colId: "당기",
          cellStyle: { textAlign: "right" },
          width: 150,
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
        {
          headerName: "합계금액",
          field: "costSummary",
          colId: "당기",
          cellStyle: { textAlign: "right" },
          width: 150,
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
      ],
    },
    {
      headerName: "전기",
      headerClass: "participant-group",
      marryChildren: true,
      children: [
        {
          headerName: "세부금액",
          field: "earlyCost",
          colId: "전기",
          cellStyle: {
            textAlign: "right",
            borderLeft: "0.1mm ridge #c2c2c2",
            //borderRight: "0.1mm ridge #c2c2c2",
          },
          width: 150,
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
        {
          headerName: "합계금액",
          field: "earlyCostSummary",
          colId: "전기",
          cellStyle: { textAlign: "right" },
          width: 150,
          valueFormatter:
            ' Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")+" 원"',
        },
      ],
    },
  ];

  const { dark } = useThemeSwitcher();

  return (
    <>
      <div
        className={dark ? "ag-theme-alpine-dark" : "ag-theme-material"}
        skipHeaderOnAutoSize="true"
        enableColResize="true"
        enableSorting="true"
        enableFilter="true"
        enableRangeSelection="true"
        rowStyle={{ "text-align": "center" }}
        style={{
          //height: "60vh",
          width: "100%",
          float: "center",
        }}
        cellStyle={{ textAlign: "center" }}
      >
        {!isLoading ? (
          <AgGridReact
            columnDefs={CostStatementGrid}
            rowData={data}
            rowSelection="single"
            getRowStyle={function(param) {
              //가운데
              if (param.node.rowPinned) {
                return { "font-weight": "bold", background: "#dddddd" };
              }
              return { "text-align": "center" };
            }}
            onGidReady={event => {
              event.api.sizeColumnsToFit();
            }}
            onGridSizeChanged={event => {
              event.api.sizeColumnsToFit();
            }}
            domLayout={"autoHeight"}
            // onGridReady={onGridReady}
            // onCellClicked={onCellClicked}
          />
        ) : (
          <h1 align="center">로딩중</h1>
        )}
      </div>
    </>
  );
};

export default CostStatementGrid;
