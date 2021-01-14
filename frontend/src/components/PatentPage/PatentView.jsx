import React, { useState, useEffect } from "react";
import PatentCard from "../PatentPage/PatentCard";
import { Button, Form } from "react-bootstrap";

const PatentView = () => {

  // Patents is an object that contains the documentID and the Patent Corpus
  // SetPatents is used to set the state for patents

  const [patents, setPatents] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        
        // we are using fetch to call the backend endpoint that contains all 368 patents.
        const response = await fetch("/patents");

        const body = await response.json();

        setPatents(

          // This sets the state of patents to be an object that contains only the documentID and Patent Corpus
          // we map throught the object to acxomplish this

          body.map((id) => {
            return { documentId: id.documentId, patentCorpus: id.patentCorpus };
          })
        );
      } catch (error) {}
    }

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col">
        <PatentCard patents={patents} />
      </div>

      <div className="col">
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
            <Button
              variant="primary"
              size="lg"
              className="mr-3"
              handleclick={""}
            >
              {" "}
              Next
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PatentView;
