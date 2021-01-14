import React, { Component } from 'react';
import { Link} from "react-router-dom";

class Login extends Component {
    
    render() {
        return (
            <div className = "d-flex justify-content-center " >
            <div className="login-box">
              <div className="login-logo">
                
                  <b>Login</b>
      
              </div>
              {/* /.login-logo */}
              <div className="card">
                <div className="card-body login-card-body">
                  <p className="login-box-msg">Sign in to start your session</p>
                  <form
                    method="post"
                    onSubmit={''}
                  >
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
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
                      <div className="col-8">
                        <div className="icheck-primary">
                          <input type="checkbox" id="remember" />
                          <label htmlFor="remember">Remember Me</label>
                        </div>
                      </div>
                      {/* /.col */}
                      <div className="col-4">
                        <button type="submit" className="btn btn-primary btn-block">
                          Sign In
                        </button>
                      </div>
                      {/* /.col */}
                    </div>
                  </form>
                  {/* /.social-auth-links */}
                  <p  className="mb-1">
                    <Link to="#">
                      I forgot my password
                    </Link>
                  </p>
                  <p className="mb-0">
                    <Link
                      to="#"
                      className="text-center"
                    >
                      Register
                    </Link>
                  </p>
                </div>
                {/* /.login-card-body */}
              </div>
            </div>
            </div>
        );
    }
}

export default Login;