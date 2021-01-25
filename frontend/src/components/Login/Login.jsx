import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = (props) => {
  const { register, handleSubmit } = useForm(); // initialize the hook

  //register is a function to be used as a ref provided by the useForm hook. We can assign it to each input field so that the react-hook-form can track the changes for the input field value.

  const onSubmit = (data) => {
    // This is using axios to make a post request to our backend and sends {email,password}
    // and checks if user is in our Database

    axios({
      url: "/users/Login", // route in backend
      method: "POST",
      data: {
        email: data.email,
        password: data.password,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          props.history.push("/Dashboard");
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log("Error", error.response.data.message);
      });
  };

  return (
    <div className="d-flex justify-content-center ">
      <div className="login-box">
        <div className="login-logo">
          <b>Login</b>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <Form
              action="/users/login"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="input-group mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  autoComplete="username"
                  ref={register({ required: true })}
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
                  autoComplete="false"
                  ref={register({ required: "Password Required" })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
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
              </div>
            </Form>
            <p className="mt-2">
              Don't have An Account?{" "}
              <Link to="/signup" className="text-center">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
