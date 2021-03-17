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
        document:props.patents[0].documentId,
        mal:data.MachineLearningPatent,
        hdw:data.Hardware,
        evo:data.EVO,
        spc:data.Speech,
        vis:data.Vision,
        nlp:data.NLP,
        pln:data.Planning,
        kpr:data.KnowledgeProcessing,
        //user = get user email from cookies???
      }
    })
    .then(response=>{
      console.log("Data: ", response.data)
      window.location.reload();
    })
    .catch(error => {
      console.log("Error: ", error.data )
    })
  }
  const nextPage = ()=>{
    window.location.reload();
 }

  return (
    <div>
      <Form className="container mt-5" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a Machine Learning Patent?</Form.Label>
          <Form.Control name ="MachineLearningPatent" as="select" size="sm" ref={register} defaultValue="No">
            <option>Yes</option>
            <option>No</option>
            
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a AI hardware Patent?</Form.Label>
          <Form.Control name ="Hardware" as="select" size="sm" ref={register} defaultValue="No">
            <option>Yes</option>
            <option >No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a Evolutionary computation Patent?</Form.Label>
          <Form.Control name ="EVO" as="select" size="sm" ref={register} defaultValue="No">
            <option>Yes</option>
            <option >No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a Natural Language Processing Patent?</Form.Label>
          <Form.Control name ="NLP" as="select" size="sm" ref={register} defaultValue="No">
            <option>Yes</option>
            <option >No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a Speech Patent?</Form.Label>
          <Form.Control name ="Speech" as="select" size="sm" ref={register} defaultValue="No">
            <option>Yes</option>
            <option  >No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a Vision Patent?</Form.Label>
          <Form.Control name ="Vision" as="select" size="sm" ref={register} defaultValue="No">
            <option>Yes</option>
            <option>No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a Knowledge Processing Patent?</Form.Label>
          <Form.Control name ="KnowledgeProcessing" as="select" size="sm" ref={register} defaultValue="No">
            <option>Yes</option>
            <option >No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a Planning/Control Patent?</Form.Label>
          <Form.Control name ="Planning" as="select" size="sm" ref={register} defaultValue="No">
            <option>Yes</option>
            <option  >No</option>
          </Form.Control>
        </Form.Group>
        <div className="row justify-content-between"> 
        <Button type="submit" variant="primary" size="lg" className="col-3">
          {" "}
          Submit
        </Button>
        <Button variant="primary" size="lg" className="col-3" onClick={nextPage}>
            {" "}
            Next
          </Button>
          </div>
      </Form>
    </div>
  );
};

export default PatentForm;
