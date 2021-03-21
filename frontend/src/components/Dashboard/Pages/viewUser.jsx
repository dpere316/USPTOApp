import React, { useState, useEffect } from "react";
import Nav from "../components/DashboardNavigation";
import MaterialTable from "material-table";

const ViewUser = () => {
  const [rowData, setRowData] = useState([]);

  const COLUMNS = [
    { title: "ID", field: "_id" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
  ];

  console.log(rowData);
  useEffect(() => {
    async function fetchData() {
      try {
        // we are using fetch to call the backend endpoint that contains all 368 patents.
        const response = await fetch("/users");

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
          title="Users"
          columns={COLUMNS}
          data={rowData}
          isLoading={rowData.length === 0}
          options={{ exportButton: true, exportAllData: true, pageSize: 15 }}
        />
      </div>
    </div>
  );
};

export default ViewUser;
