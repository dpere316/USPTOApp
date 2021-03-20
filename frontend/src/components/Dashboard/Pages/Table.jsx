import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import Nav from "../components/DashboardNavigation";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Table = () => {
    
    const [rowData, setRowData] = useState();
    
    useEffect(() => {
      async function fetchData() {
        try {
          
          // we are using fetch to call the backend endpoint that contains all 368 patents.
          const response = await fetch("/patents/labels");
  
          const body = await response.json();
          // body is an object with the response 
          
          setRowData(body);

        } catch (error) {}
      }
  
      fetchData();
    }, []);
    
    const onFirstDataRendered = (params) => {
      params.api.sizeColumnsToFit();
    };


    return (
      <div>
      <Nav />
        <div className="ag-theme-alpine container-fluid mt-5"  style={{width:'100vw', height:'100vh'}}>
            <AgGridReact rowData={rowData}   rowSelection="multiple"  onFirstDataRendered={onFirstDataRendered}>
               <AgGridColumn field="_id" sortable={ true } filter={ true }></AgGridColumn>
                <AgGridColumn field="document" sortable={ true } filter={ true }></AgGridColumn>
                <AgGridColumn field="user" sortable={ true } filter={ true }></AgGridColumn>
                <AgGridColumn field="createdAt" sortable={ true } filter={ true }></AgGridColumn>
                <AgGridColumn field="mal" sortable={ true } filter={ true }></AgGridColumn>
                <AgGridColumn field="hdw" sortable={ true } filter={ true }></AgGridColumn>
                <AgGridColumn field="evo" sortable={ true } filter={ true }></AgGridColumn>
                <AgGridColumn field="spc" sortable={ true } filter={ true }></AgGridColumn>
                <AgGridColumn field="vis" sortable={ true } filter={ true }></AgGridColumn>
                <AgGridColumn field="nlp" sortable={ true } filter={ true }></AgGridColumn>
                <AgGridColumn field="pln" sortable={ true } filter={ true }></AgGridColumn>
                <AgGridColumn field="kpr" sortable={ true } filter={ true }></AgGridColumn>
            </AgGridReact>
        </div>
        </div>
    );
};

export default Table;