import React from 'react';
import Nav from './components/DashboardNavigation';
import Chart from './components/Chart';


const Dashboard = (props) => {


    return (
        <div>
        <h1>{props.loggedInStatus}</h1>
                <Nav/>
                <Chart/>
        </div>
    );
};



export default Dashboard;
