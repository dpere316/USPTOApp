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

                 
                    let testnumeric = []
                    let test1 = [];
                    let test2 = [];
                    let currDoc, currUser;

                    let arr1 = [];
                    let arr2 = [];
                    for (const row in Object.entries(rowData))
                    {
                      // for (cons)
                      let p = rowData[row];
                      currDoc = p.document;
                      currUser = p.user;
                       
                      var curr = {'doc': currDoc, 'user':currUser};
                      console.log(curr.doc);
                      if(!test1.some(curr => curr.doc === currDoc)){
                        arr1.push(p.mal, p.hdw ,p.evo ,p.spc ,p.vis, p.nlp ,p.pln, p.kpr)
                        test1.push(curr);
                      }
                      else if(!test2.some(curr => curr.doc === currDoc))
                      {
                        arr2.push(p.mal, p.hdw ,p.evo ,p.spc ,p.vis, p.nlp ,p.pln, p.kpr)
                        test2.push(curr);
                      }
                   
                    }
                    console.log(test1)
                    console.log(test2)
                    console.log(arr1)
                    console.log(arr2)

          
                    const categories = ["Yes", "No"];

                    let rev1numeric = Cohen.nominalConversion(categories,arr1);
                    let rev2numeric = Cohen.nominalConversion(categories,arr2);

                    // let rev3numeric = Cohen.nominalConversion(categories,(({  mal, hdw ,evo ,spc ,vis, nlp ,pln, kpr }) => ({ mal, hdw ,evo ,spc ,vis, nlp ,pln, kpr}))(...rowData) );
                    // let rev4numeric = Cohen.nominalConversion(categories,(({  mal, hdw ,evo ,spc ,vis, nlp ,pln, kpr }) => ({ mal, hdw ,evo ,spc ,vis, nlp ,pln, kpr}))(...rowData) );

                    let kappaUnweighted = Cohen.kappa(
                      rev1numeric,
                      rev2numeric,
                      2,
                      "none"
                    );

                    
                    alert("Unweighted kappa: " + kappaUnweighted);
                    
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