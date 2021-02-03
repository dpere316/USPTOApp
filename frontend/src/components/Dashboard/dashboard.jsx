import React from "react";
import Nav from "./components/DashboardNavigation";
import Chart from "./components/Chart";

const Dashboard = (props) => {
  return (
    <div>
      <p>
        Don't have An Account?
      </p>
      <Nav />
      <Chart />
    </div>
  );
};

export default Dashboard;
