import React, { Component } from 'react';
import { Link} from "react-router-dom";

class signup extends Component {
    render() {
        return (
            <div className = "d-flex justify-content-center " >
            <div className="login-box">
              <div className="login-logo">
                
                  <b>SignUp</b>
      
              </div>
              {/* /.login-logo */}
              <div className="card">
                <div className="card-body login-card-body">
                  <p className="login-box-msg">Sign Up to start your session</p>
                  <form
                    method="post"
                    onSubmit={''}
                  >
                    <div className="input-group mb-3">
                      <input
                        className="form-control"
                        placeholder="First Name"
                        onChange={''}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-user" />
                        </div>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        className="form-control"
                        placeholder="Last Name"
                        onChange={''}
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
                        className="form-control"
                        placeholder="email"
                        onChange={''}
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
                        className="form-control"
                        placeholder="Password"
                        onChange={''}
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
    }
}

export default signup;