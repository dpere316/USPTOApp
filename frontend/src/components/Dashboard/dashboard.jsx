import React, { Component } from 'react';
import Nav from './components/DashboardNavigation';
import Chart from './components/Chart';


class dashboard extends Component {
    render() {
        return (
            <div>
                <Nav/>
                <Chart/>
            </div>
        );
    }
}

export default dashboard;