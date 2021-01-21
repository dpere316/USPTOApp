import React from "react";
import { Button, Form } from "react-bootstrap";
import {useForm} from 'react-hook-form';
import axios from 'axios';

const PatentForm = (props) => {

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // This is using axios to make a post request to our backend and send {name,email,password}
    // and store it in mongoDB
    axios({
      url:"/patents/labels", // route in backend
      method:"POST",
      data:{
        documentId:props.patents[0].documentId,
        MachineLearningPatent: data.MachineLearningPatent,
        ActiveLearningPatent:data.ActiveLearningPatent
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
    <div>
      <Form className="container mt-5" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a Machine Learning Patent?</Form.Label>
          <Form.Control name ="MachineLearningPatent" as="select" size="sm" ref={register}>
            <option>Yes</option>
            <option>No</option>
            
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a Active Learning Patent?</Form.Label>
          <Form.Control name ="ActiveLearningPatent" as="select" size="sm" ref={register}>
            <option>Yes</option>
            <option>No</option>
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" size="lg">
          {" "}
          Submit
        </Button>
        <div className="d-flex justify-content-end">
          <Button variant="primary" size="lg" className="mr-3" handleclick={""}>
            {" "}
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PatentForm;
