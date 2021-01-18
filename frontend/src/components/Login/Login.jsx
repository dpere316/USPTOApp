import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () =>  {

  const [email, setEmail, password, setPassword] = useState(""); 

  const handleSubmit = () => {
    
  }

  const handleChange = () => {
    
  }

  
    return (
      <div className="d-flex justify-content-center ">
        <div className="login-box">
          <div className="login-logo">
            <b>Login</b>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              {/* <% include ./partials/messages %> */}
              <form action="/users/login" method="POST">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* /.col */}
                  <div className="col">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                    <div className=" mt-2">
                      <div className="icheck-primary">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember Me</label>
                      </div>
                    </div>
                  </div>
                  {/* /.col */}
                </div>
              </form>
              <p className="mt-2">Don't have An Account?  <Link to="/signup" className="text-center">
                  SignUp
                </Link></p>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    );
  }


export default Login;
