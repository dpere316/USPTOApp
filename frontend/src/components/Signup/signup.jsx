// Form needs UI validation

import React from "react";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form';
import axios from 'axios';

const Signup = () => {

  const { register, handleSubmit} = useForm(); // Needs errors for form validation

  
  const onSubmit = (data) => {
   
    axios({
      url:"/users/register",
      method:"POST",
      data:{
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
    .then(response=>{
      console.log("Data: ", response.data)
    })
    .catch(error => {
      console.log("Error: ", error.data )
    })
  }

  return (
    <div className="d-flex justify-content-center ">
        <div className="login-box">
          <div className="login-logo">
            <b>SignUp</b>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign Up to start your session</p>
              <form action="/users/signup" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <input
                    type="name"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                    ref={register({required: true})}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    ref={register({required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})}
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
                    placeholder="Create Password"
                    ref={register({required: true})}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    className="form-control"
                    placeholder="Confirm Password"
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
                      Sign Up
                    </button>
                    <p className="lead mt-4">Have An Account?  <Link to="/login" className="text-center">
                  Login
                </Link></p>
                  </div>
                  {/* /.col */}
                </div>
              </form>
              {/* /.social-auth-links */}
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
  );
};

export default Signup;

