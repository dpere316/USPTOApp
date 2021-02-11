import React from 'react';
import image from '../../assests/25372 [Converted].png';

const Home = () => {
    return (
        

        <div className="d-flex justify-content-center" style= {{backgroundImage:`url("${image}")`, height: '100vh' , backgroundSize: "cover"}}>
        <div className= "text-center mt-5" >
          <h5> Welcome to </h5>
          <h1> Patentify </h1>
          <h4> AI Assisted Patent Labeling </h4>
        </div>

        </div>
        
    );
};

export default Home;