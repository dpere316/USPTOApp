import React from "react";
import { Button, Form } from "react-bootstrap";
import {useForm} from 'react-hook-form';
import axios from 'axios';

const AdminStats = (props) => {

    const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // This is using axios to make a post request to our backend and send {name,email,password}
    // and store it in mongoDB
    axios({
      url:"/adminstats", // route in backend
      method:"POST",
      data:{
        // PatentId:data.PatentId
      }
    })
    .then(response=>{
      console.log("Data: ", response.data)
      window.location.reload();
    })
    .catch(error => {
      console.log("Error: ", error.data )
    })
  
//   const nextPage = ()=>{
//     window.location.reload();
}

  return (
    <div>
      <form
                action="/adminstats/"
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
              >
         <div className="input-group mb-3">
                  <input
                    type="name"
                    id="PatentId"
                    name="PatentId"
                    className="form-control"
                    placeholder="Enter PatentId"
                    ref={register({ required: true })}
                    required
                  />
                  </div>
                  <div className="col">
                    <button type="submit" className="btn btn-primary btn-block">
                      Calculate
                    </button>
                    </div>
                    </form>
    </div>
  );
};

export default AdminStats;