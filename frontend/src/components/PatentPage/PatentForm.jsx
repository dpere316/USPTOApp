import React from "react";
import { Button, Form } from "react-bootstrap";

const PatentForm = () => {
  return (
    <div>
      <Form className="container mt-5" onSubmit={""}>
        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a Machine Learning Patent?</Form.Label>
          <Form.Control as="select" size="sm" custom onChange={""}>
            <option>Yes</option>
            <option>No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Is this a Active Learning Patent?</Form.Label>
          <Form.Control as="select" size="sm" custom onChange={""}>
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
