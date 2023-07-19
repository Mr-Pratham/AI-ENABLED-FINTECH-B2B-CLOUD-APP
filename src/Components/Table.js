import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'SI No.', width: 90 },
  { field: 'customerOrderId', headerName: 'CUSTOMER ORDER ID', width: 200 },
  { field: 'salesOrg', headerName: 'SALES ORG', width: 130 },
  { field: 'distributionChannel', headerName: 'DISTRIBUTION CHANNEL', width: 260 },
  { field: 'companyCode', headerName: 'COMPANY CODE', width: 130 },
  { field: 'orderCreationDate', headerName: 'ORDER CREATION DATE', width: 200 },
  { field: 'orderamount', headerName: 'ORDER AMOUNT', width: 160 },
  { field: 'orderCurrency', headerName: 'ORDER CURRENCY', width: 160 },
  { field: 'customerNumber', headerName: 'CUSTOMER NUMBER', width: 150 },
];

const rows = [
  { id: 1, customerOrderId: '754349803', salesOrg: '3911', distributionChannel: 'United Arab Emirates', companyCode: '3290', orderCreationDate: '01-01-2022', orderamount: '1405.54', orderCurrency: 'EUR', customerNumber: '1210499770' },
  { id: 2, customerOrderId: '930253442', salesOrg: '2381', distributionChannel: 'Greece', companyCode: '3290', orderCreationDate: '01-01-2022', orderamount: '1441.4835', orderCurrency: 'EUR', customerNumber: '1210351400' },
  { id: 3, customerOrderId: '819741436', salesOrg: '3605', distributionChannel: 'Argentina', companyCode: '3290', orderCreationDate: '01-01-2022', orderamount: '1065.33', orderCurrency: 'EUR', customerNumber: '1210124309' },
  { id: 4, customerOrderId: '881355361', salesOrg: '3645', distributionChannel: 'Armenia', companyCode: '3470', orderCreationDate: '02-01-2022', orderamount: '302.85', orderCurrency: 'EUR', customerNumber: '12311152' },
  { id: 5, customerOrderId: '821659852', salesOrg: '2470', distributionChannel: 'United States of America', companyCode: '3220', orderCreationDate: '02-01-2022', orderamount: '8380.69', orderCurrency: 'EUR', customerNumber: '1230021722' },
  { id: 6, customerOrderId: '957194828', salesOrg: '3150', distributionChannel: 'United States Minor Outlying Islands', companyCode: '3290', orderCreationDate: '02-01-2022', orderamount: '545.85', orderCurrency: 'EUR', customerNumber: '1210183107' },
  { id: 7, customerOrderId: '806322513', salesOrg: '3396', distributionChannel: 'Serbia', companyCode: '3290', orderCreationDate: '02-01-2022', orderamount: '545.85', orderCurrency: 'EUR', customerNumber: '1210499770' },
  { id: 8, customerOrderId: '922237131', salesOrg: '2353', distributionChannel: 'Turks and Caicos', companyCode: '3290', orderCreationDate: '02-01-2022', orderamount: '562.73', orderCurrency: 'EUR', customerNumber: '1210111951' },
];

const StyledDataGrid = styled(DataGrid)`
  .MuiDataGrid-cell,
  .MuiDataGrid-columnHeader,
  .MuiCheckbox-colorPrimary.Mui-checked,
  .MuiCheckbox-colorPrimary.Mui-checked .MuiIconButton-label:after {
    color: white; /* Set font color to white */
  }

  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root {
    color: white;
  }

  .MuiCheckbox-colorPrimary.Mui-checked,
  .MuiCheckbox-colorPrimary.Mui-checked .MuiIconButton-label:after {
    color: #fc7500; /* Set font color to white */
  }
  .MuiTablePagination-selectLabel,
  .MuiTablePagination-selectRoot {
    color: white; /* Set footer text color to white */
  }
  
  .MuiTablePagination-displayedRows,
  .MuiTablePagination-toolbar {
    color: white; /* Set color of "1–8 of 8" and number of pages */
  }
  
  .MuiTablePagination-selectIcon {
    color: white; /* Set color of drop-down icon */
  }
  
  .MuiTablePagination-actions {
    color: white; /* Set color of pagination actions */
  }
`;

const gridContainerStyle = {
  height: '100%',
  width: '100%',
  overflow: 'auto',
};

const gridStyle = {
  width: '100%',
  maxWidth: '100%',
  backgroundColor: '#a9a9a9',
};
export default function DataGridDemo(props) {
  const [pageSize, setPageSize] = React.useState(5);

  return (
    <div style={gridContainerStyle}>
      <div style={gridStyle}>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          disableColumnResize
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
          }}
        />
      </div>
    </div>
  );
}


// In order to use Data from MySql uncomment the below code and comment the above code


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";
// import { Card, CircularProgress, Box } from "@mui/material";

// const columns = [
//   { field: 'id', headerName: 'SI No.', width: 90 },
//   { field: 'customerOrderId', headerName: 'CUSTOMER ORDER ID', width: 200 },
//   { field: 'salesOrg', headerName: 'SALES ORG', width: 130 },
//   { field: 'distributionChannel', headerName: 'DISTRIBUTION CHANNEL', width: 260 },
//   { field: 'companyCode', headerName: 'COMPANY CODE', width: 130 },
//   { field: 'orderCreationDate', headerName: 'ORDER CREATION DATE', width: 200 },
//   { field: 'orderamount', headerName: 'ORDER AMOUNT', width: 160 },
//   { field: 'orderCurrency', headerName: 'ORDER CURRENCY', width: 160 },
//   { field: 'customerNumber', headerName: 'CUSTOMER NUMBER', width: 150 },
// ];
// export default function DataTable(props) {
//   const { search, setSelect, searchedData, refresh } = props;

//   const [data, setData] = useState();
//   const [loading, setLoading] = useState(true);
//   const [pageSize, setPageSize] = useState(10);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     setLoading(true);
//     const getData = async () => {
//       const res = await axios.get(
//         "http://localhost:8080/BACKEND-JAVA/listInvoice"
//       );
//       setData(res.data);
//       setLoading(false);
//     };

//     getData();
//   }, [refresh]);

//   return (
//     <>
//       {/* Table UI */}
//       <Card
//         style={{
//           height: 461,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#a9a9a9",
//         }}
//       >
//         {loading ? (
//           <CircularProgress />
//         ) : (
//           <DataGrid
//             style={{ width: "100%", border: "none" }}
//             sx={{
//               "& .MuiTablePagination-root": {
//                 color: "white",
//                 width: "100%",
//               },
//               "& .MuiDataGrid-cell": {
//                 color: "white",
//                 borderBottom: "1.5px solid #B3B7BA",
//                 justifyContent: "flex-end",
//               },
//               "& .MuiButtonBase-root.MuiIconButton-root": {
//                 color: "white",
//               },
//               "& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled": {
//                 color: "#a9a9a9",
//               },
//               ".MuiDataGrid-row.Mui-selected": {
//                 backgroundColor: "#1D2B34",
//                 color: "white",
//               },
//               ".MuiDataGrid-row.Mui-selected:hover": {
//                 backgroundColor: "#1D2B34",
//                 color: "white",
//               },
//               "& .MuiCheckbox-root": {
//                 color: "white",
//               },
//               "& .MuiCheckbox-root.Mui-checked": {
//                 color: "white",
//               },
//               "& .MuiDataGrid-row:hover": {
//                 color: "white",
//                 backgroundColor: "#1D2B34",
//               },
//               "& .MuiDataGrid-columnHeaders": {
//                 backgroundColor: "#a9a9a9",
//                 color: "white",
//                 borderBottom: "2px solid #B3B7BA",
//               },
//               "& .MuiDataGrid-columnSeparator": {
//                 color: "transparent",
//               },
//               "& .MuiDataGrid-selectedRowCount": {
//                 color: "white",
//                 width:"20%",
//                 position: "absolute",
//               },
//               "& .MuiDataGrid-columnHeadersInner": {
//                 marginLeft: {lg:"4px"},
//               },
//               "& .MuiDataGrid-footerContainer": {
//                 backgroundColor: "#a9a9a9",
//               },
//               "& .MuiSvgIcon-root.MuiSelect-icon": {
//                 color: "white",
//               },
//               "& .MuiDataGrid-columnHeaderTitle": {
//                 textOverflow: "clip",
//                 whiteSpace: "break-spaces",
//                 lineHeight: 1.8,
//               },
//               "& .MuiTablePagination-actions": {
//                 position: {lg: "absolute"},
//                 left: "50%",
//                 transform: {lg: "translateX(-50%)"},
//                 width: {lg:"12%"},
//                 marginLeft: {xs:2, lg:0},
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               },
//               "& .MuiTablePagination-displayedRows": {
//                 marginRight:{lg:2}
//               },  
//             }}
//             rows={
//               searchedData.length > 0
//                 ? searchedData
//                 : search === ""
//                 ? data
//                 : data.filter(
//                     (row) =>
//                       row.customerNumber.toString()
//                         .toLowerCase()
//                         .includes(search.toLowerCase()) ||
//                       row.companyCode.toString()
//                         .toLowerCase()
//                         .includes(search.toLowerCase()) ||
//                       row.id.toString()
//                         .toLowerCase()
//                         .includes(search.toLowerCase()) ||
//                       row.customerOrderId.toLowerCase().includes(search.toLowerCase())
//                   )
//             }
//             columns={columns}
//             getRowId={(data) => data.SlNo}
//             rowHeight={31}
//             rowsPerPageOptions={[10, 25, 35]}
//             loading={loading}
//             checkboxSelection
//             pageSize={pageSize}
//             onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//             onSelectionModelChange={(itm) => setSelect(itm)}
//             headerHeight={80}
//             disableColumnMenu={true}
//             onPageChange={(page) => setPage(page + 1)}
//           />
//         )}
//       </Card>
//       {loading === true || searchedData.length > 0 ? null : (
//         <Box
//           sx={{
//             color: "white",
//             position: "absolute",
//             left: "49%",
//             bottom:"9%",
//             zIndex: 10,
//             visibility: { xs: "hidden", lg: "visible" },
//           }}
//         >
//           {page} of {(data.length / pageSize).toFixed(0)}
//         </Box>
//       )}
//     </>
//   );
// }