import React, { useState, useEffect } from "react";
import Nav from "../components/DashboardNavigation";
import MaterialTable from "material-table";
const Cohen = require('cohens-kappa');

const Table = () => {
    
    const [rowData, setRowData] = useState([]);

    const COLUMNS = [ 
      { title:'Label ID', field:'_id'},
      { title:'Document ID', field:'document', defaultGroupOrder:0},
      { title:'User', field:'user', defaultGroupOrder:1},
      { title:'Date', field:'createdAt'},
      { title:'Mal', field:'mal'},
      { title:'Hdw', field:'hdw'},
      { title:'Spc', field:'spc'},
      { title:'Vis', field:'vis'},
      { title:'Nlp', field:'nlp'},
      { title:'Pln', field:'pln'},
      { title:'Evo', field:'evo'},
      { title:'Kpr', field:'kpr'},
  ]
  
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

    
   

   
    return (
      <div>
        <Nav />
        <div className="container-fluid mt-5">
          <MaterialTable
            title="Labels"
            columns={COLUMNS}
            data={rowData}
            isLoading={rowData.length === 0}
            options={{
              exportButton: true,
              exportAllData: true,
              grouping: true,
              selection: true,
            }}
            actions={[
              {
                tooltip: "Calculate InterAnnotator Agreement",
                icon: "group",
                onClick: (event, rowData) => {

                  function findKappa() {

                    const categories = ["Yes", "No"];

                    // let rev3numeric = []
                    // let rev3numeric = Cohen.nominalConversion(categories,(({  mal, hdw ,evo ,spc ,vis, nlp ,pln, kpr }) => ({ mal, hdw ,evo ,spc ,vis, nlp ,pln, kpr}))(...rowData) );
                    // let rev4numeric = Cohen.nominalConversion(categories,(({  mal, hdw ,evo ,spc ,vis, nlp ,pln, kpr }) => ({ mal, hdw ,evo ,spc ,vis, nlp ,pln, kpr}))(...rowData) );

                    // let kappaUnweighted = Cohen.kappa(
                    //   rev3numeric,
                    //   rev4numeric,
                    //   2,
                    //   "none"
                    // );
                    
                   let rev4numeric = (({  mal, hdw ,evo ,spc ,vis, nlp ,pln, kpr }) => ({ mal, hdw ,evo ,spc ,vis, nlp ,pln, kpr}))(...rowData);
                    
                 

                    // alert("Unweighted kappa: " + kappaUnweighted);
                  
                    console.log(rev4numeric)
                  }
                  findKappa();
                },
              },
            ]}
          />
        </div>
      </div>
    );
};

export default Table;