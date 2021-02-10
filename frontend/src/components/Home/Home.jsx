import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../../App.css"



const Home = (props) => {

  return (
    <html>
      <body>    
      <div className = "home-background">
        <br>
        




        
        </br>
        <div className = "welcome-text">
          <p className = "home-page-description"> Welcome to</p>
          <p className = "home-page-title">Patentify</p>
          <p className = "home-page-description">AI assisted patent labeling</p>
        </div>
        <div className = "home-links">
          <br>
          </br>
        <Link to="/login" className="btn btn-primary">
          Login     
        </Link>
        <Link to="/signup" className = "btn btn-primary">
          SignUp
        </Link>
        </div>
      </div>


      </body>
    </html>

    
  );
}

export default Home;