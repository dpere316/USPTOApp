import React, { useState } from "react";
import { Button, Form, FormCheck} from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";



const PatentForm = (props) => {

  const { register, handleSubmit, formState: {isDirty} } = useForm();

  const onSubmit = (data) => {
    // This is using axios to make a post request to our backend and send {name,email,password}
    // and store it in mongoDB
    axios({
      url: "/patents/labels", // route in backend
      method: "POST",
      data: {
        documentId: props.patents[0].documentId,
        mal: data.mal,
        hdw: data.hdw,
        evo: data.evo,
        spc: data.spc,
        vis: data.vis,
        nlp: data.nlp,
        pln: data.pln,
        kpr: data.kpr,
      },
    })
      .then((response) => {
        console.log("Data: ", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error: ", error.data);
      });
  };
  const nextPage = () => {
    window.location.reload();
  };
  
  

  return (
    <div>
      <Form
        className="container-fluid mt-5"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group>
          <Form.Label>
            Is this a Machine Learning Patent?
          </Form.Label>
          <div className='row-2'>
          <FormCheck name="mal" inline type="radio" label="Yes" value='Yes' ref={register}/>
          <FormCheck name="mal" inline type="radio" label="No"  value= 'No' ref={register} defaultChecked/>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>
          Is this a AI hardware Patent?
          </Form.Label>
          <div className='row-2'>
          <FormCheck  name="hdw" inline type="radio" label="Yes"  value='Yes' ref={register}/>
          <FormCheck  name="hdw"inline type="radio" label="No"  value= 'No' ref={register} defaultChecked/>
          </div>
        </Form.Group>
        
        <Form.Group>
          <Form.Label>
          Is this a Evolutionary computation Patent?
          </Form.Label>
          <div className='row-2'>
          <FormCheck  name="evo" inline type="radio" label="Yes" value='Yes' ref={register}/>
          <FormCheck  name="evo" inline type="radio" label="No" value= 'No' ref={register} defaultChecked/>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>
          Is this a Natural Language Processing Patent?
          </Form.Label>
          <div className='row-2'>
          <FormCheck name="nlp" inline type="radio" label="Yes" value='Yes' ref={register}/>
          <FormCheck name="nlp" inline type="radio" label="No"  value= 'No' ref={register} defaultChecked/>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>
          Is this a Speech Patent?
          </Form.Label>
          <div className='row-2'>
          <FormCheck name="spc" inline type="radio" label="Yes" value='Yes' ref={register}/>
          <FormCheck name="spc" inline type="radio" label="No"  value= 'No' ref={register} defaultChecked/>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>
          Is this a Vision Patent?
          </Form.Label>
          <div className='row-2'>
          <FormCheck name="vis" inline type="radio" label="Yes" value='Yes' ref={register}/>
          <FormCheck name="vis" inline type="radio" label="No"  value= 'No' ref={register} defaultChecked/>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>
          Is this a Knowledge Processing Patent?
          </Form.Label>
          <div className='row-2'>
          <FormCheck name="kpr" inline type="radio" label="Yes" value='Yes' ref={register}/>
          <FormCheck name="kpr" inline type="radio" label="No"  value= 'No' ref={register} defaultChecked/>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Label>
          Is this a Planning/Control Patent?
          </Form.Label>
          <div className='row-2'>
          <FormCheck  name="pln" inline type="radio" label="Yes" value='Yes' ref={register}/>
          <FormCheck  name="pln" inline type="radio" label="No"  value= 'No' ref={register} defaultChecked/>
          </div>
        </Form.Group>

        <div className="row justify-content-around mt-5">
          <Button disabled={!isDirty} type="submit" variant="primary" size="lg" className="col-3">
            {" "}
            Submit
          </Button>
          <Button
            variant="danger"
            size="lg"
            className="col-3"
            onClick={nextPage}
          >
            {" "}
            Skip
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PatentForm;
