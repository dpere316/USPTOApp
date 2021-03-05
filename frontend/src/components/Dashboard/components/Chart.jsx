import React, { useEffect } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

const Chart = (props) => {
 
  const [chartData, setChartData] = useState({});

  const chart = () => {
    
    setChartData({
        labels:[], // name of annotator
        datasets: [{
            label:'# of Patents Annotated',
            data: [32, 22, 17, 20, 15, 26], // number of patents annotated
            backgroundColor:'rgba(14,30,64,1)',
           
          }],
        borderWidth: 0,
      });
    };


  useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      {/* /.content-header */}
      {/* Main content */}
      <div className="content mt-5 ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Annotator Activity</h3>
                  </div>
                </div>
                <div className="card-body">
                  <Bar data={chartData}/>
                </div>
              </div>
              {/* /.card */}
            </div>
            {/* /.col-md-6 */}
            <div className="col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Machine Learning Patents</h3>
                  </div>
                </div>
                <div className="card-body">
                  <Bar data={chartData} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">AI Hardware Patents</h3>
                  </div>
                </div>
                <div className="card-body">
                  <Bar data={chartData} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Evolutionary Computation Patents</h3>
                  </div>
                </div>
                <div className="card-body">
                  <Bar data={chartData} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Natural Language Processing Patents</h3>
                  </div>
                </div>
                <div className="card-body">
                  <Bar data={chartData} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Speech Patents</h3>
                  </div>
                </div>
                <div className="card-body">
                  <Bar data={chartData} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Vision Patents</h3>
                  </div>
                </div>
                <div className="card-body">
                  <Bar data={chartData} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Knowledge Processing Patents</h3>
                  </div>
                </div>
                <div className="card-body">
                  <Bar data={chartData} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Planning/Control Patents</h3>
                  </div>
                </div>
                <div className="card-body">
                  <Bar data={chartData} />
                </div>
              </div>
            </div>
            {/* /.col-md-6 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content */}
    </div>
  );
};

export default Chart;
